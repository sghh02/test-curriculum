import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const repoRoot = resolve(new URL("..", import.meta.url).pathname);
const indexPath = resolve(repoRoot, "index.json");
const index = JSON.parse(readFileSync(indexPath, "utf-8"));

const errors = [];
const warnings = [];
const allowedBacklogUrls = new Set([
  "https://convi0310.backlog.com/projects/TESTCURRICULUM",
  "https://convi0310.backlog.com/wiki/TESTCURRICULUM/%E3%83%81%E3%82%B1%E3%83%83%E3%83%88%E8%B5%B7%E7%A5%A8",
]);

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractH2Section(markdown, headingText) {
  const lines = markdown.split(/\r?\n/);
  const headingPattern = new RegExp(`^##\\s+${escapeRegExp(headingText)}\\s*$`);

  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (headingPattern.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (lines[i].startsWith("## ")) {
      end = i;
      break;
    }
  }

  return lines.slice(start, end).join("\n");
}

const normalizeTitle = (value) =>
  value
    .trim()
    .replace(/^\d+\s+/, "")
    .replace(/\s+/g, "");

const groups = Array.isArray(index.chapters) ? index.chapters : [];

const requiredSections = [
  "この章のゴール",
  "よくあるミス",
  "AIに聞いてみよう",
  "チェックリスト",
];

const pathToTitle = new Map();
for (const group of groups) {
  for (const item of group.items || []) {
    if (typeof item?.path === "string" && typeof item?.title === "string") {
      pathToTitle.set(item.path, item.title);
    }
  }
}

for (const group of groups) {
  for (const item of group.items || []) {
    if (!item?.path || !item?.title) {
      errors.push(`Invalid lesson entry: ${JSON.stringify(item)}`);
      continue;
    }

    if (typeof item.hasAssignment !== "boolean") {
      errors.push(`Missing/invalid hasAssignment (expected boolean): ${item.path}`);
    }

    if (!Number.isFinite(item.estimatedMinutes) || item.estimatedMinutes < 0) {
      errors.push(`Missing/invalid estimatedMinutes: ${item.path}`);
    }

    const lessonPath = resolve(repoRoot, item.path);
    let content = "";
    try {
      content = readFileSync(lessonPath, "utf-8");
    } catch {
      errors.push(`Missing file: ${item.path}`);
      continue;
    }

    const titleLine = content.split(/\r?\n/).find((line) => line.startsWith("# "));
    const fileTitle = titleLine?.replace(/^#\s+/, "");
    if (!fileTitle) {
      errors.push(`Missing title: ${item.path}`);
      continue;
    }

    if (normalizeTitle(fileTitle) !== normalizeTitle(item.title)) {
      errors.push(`Title mismatch: ${item.path} (index: ${item.title}, file: ${fileTitle})`);
    }

    for (const heading of requiredSections) {
      if (!extractH2Section(content, heading)) {
        errors.push(`Missing required section: ${item.path} (## ${heading})`);
      }
    }

    if (item.hasAssignment) {
      const section = extractH2Section(content, "課題提出");
      if (!section) {
        errors.push(`Missing required section: ${item.path} (## 課題提出)`);
      } else {
        const expectedBranch = `feature/${basename(item.path, ".md")}`;
        if (!section.includes(expectedBranch)) {
          errors.push(
            `課題提出 must include branch name \`${expectedBranch}\`: ${item.path}`
          );
        }
      }
    } else if (!extractH2Section(content, "完了記録")) {
      errors.push(`Missing required section: ${item.path} (## 完了記録)`);
    }

    const forbiddenPatterns = [
      { pattern: /Wiki\//, label: "legacy Wiki path" },
      { pattern: /結合試験\//, label: "legacy student-specific page path" },
    ];

    for (const { pattern, label } of forbiddenPatterns) {
      if (pattern.test(content)) {
        errors.push(`${item.path}: contains forbidden legacy reference (${label})`);
      }
    }

    const backlogUrls = content.match(/https?:\/\/[^\s)]+backlog\.com\/[^\s)]+/gi) ?? [];
    for (const url of backlogUrls) {
      if (!allowedBacklogUrls.has(url)) {
        errors.push(
          `${item.path}: contains unsupported Backlog URL (${url})`
        );
      }
    }

    const lines = content.split(/\r?\n/);
    let inFence = false;

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (line.startsWith("```")) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;

      const linkMatches = line.matchAll(
        /\[([^\]]+)\]\(((?:\.\/|chapters\/)[^)\s]+?\.md)\)/g
      );

      for (const match of linkMatches) {
        const label = match[1].trim();
        const target = match[2].trim();
        const canonical = target.startsWith("./")
          ? `chapters/${target.slice(2)}`
          : target;
        const expected = pathToTitle.get(canonical);

        if (!expected) {
          errors.push(
            `${item.path}: link target \`${target}\` does not match any lesson path in index.json at line ${i + 1}.`
          );
          continue;
        }

        if (label !== expected) {
          warnings.push(
            `${item.path}: link text should match sidebar title ([${expected}](./${basename(canonical)})) at line ${i + 1}.`
          );
        }

        if (target.startsWith("chapters/")) {
          errors.push(
            `${item.path}: use relative links like \`./${basename(canonical)}\` instead of \`${target}\` at line ${i + 1}.`
          );
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error("Validation failed:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("Warnings:\n" + warnings.map((warning) => `- ${warning}`).join("\n"));
}

console.log("Validation passed.");
