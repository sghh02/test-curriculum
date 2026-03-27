# test-curriculum

品質の見方を学びながら、結合試験と単体試験の入口を体験し、初回のテスト案件に入る前の準備を整えるカリキュラムです。

## 構成

- `index.json`: viewer 用の目次
- `chapters/`: viewer に表示する本文
- `samples/`: 講義内で使う共通見本
- `templates/`: 受講者がコピーして使う提出テンプレ
- `legacy/`: 旧 Notion 書き出しの保管場所

## 検証

```bash
node scripts/validate-index.mjs
```
