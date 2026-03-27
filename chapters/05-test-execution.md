# 結合試験をやってみる

> 提出ブランチ：`feature/05-test-execution`（PRのbase：`develop`）

## この章のゴール

- 講師から配布された APK を使って結合試験を実施できる
- エビデンス記録とバグ報告をテンプレートに沿って残せる
- テスト結果を PR で提出する流れまで通しで体験できる

## 事前準備

この章では、講師から配布された APK と、repo 内の見本資材を使います。
着手前に次をそろえてください。

- Android 端末、または Android Studio のエミュレータ
- `adb` が使える環境
- `templates/evidence-log-template.md`
- `templates/bug-report-template.md`
- `samples/integration-test/overview.md`
- `samples/integration-test/test-case-sample.md`

## この章でやること

1. 配布 APK をインストールする
2. 見本の結合試験項目を読み、観点を理解する
3. 実際に画面を操作して結果を記録する
4. 問題があればバグ報告テンプレートに整理する
5. 記録ファイルを PR で提出する

## 進め方

### 1. 見本をコピーする

自分の学習リポジトリに、次の名前でファイルを作成してください。

- `integration-test-evidence.md`
- `integration-test-bug-report.md`
- `integration-test-summary.md`

中身は、repo 内のテンプレートをコピーして始めます。

### 2. テストを実施する

`samples/integration-test/test-case-sample.md` の項目を見ながら、少なくとも次を確認します。

- 正常系で基本フローが通るか
- 異常系で明らかに壊れないか
- 画面遷移やメッセージに違和感がないか

### 3. 結果を残す

- 実施したケースごとに結果を `integration-test-evidence.md` に残す
- 問題があれば `integration-test-bug-report.md` にまとめる
- 全体の所感を `integration-test-summary.md` に短く書く

## よくあるミス

- 結果だけ書いて、どの手順で確認したか残していない
- スクリーンショットだけ残して文章を省略する
- 問題が出たのに、期待結果を書かずに終える

## AIに聞いてみよう

```text
目的：結合試験の結果整理をしたい
現状：正常系は確認できたが、異常系の記録が曖昧
詰まりポイント：どこまで書けば他の人が追えるか不安
自分の仮説：手順、期待結果、実際結果をセットで書けば伝わる
確認したいこと：この記録で不足している観点を教えて
```

## チェックリスト

- [ ] APK の導入と起動確認ができた
- [ ] 見本の試験項目に沿って結果を記録できた
- [ ] 問題があればバグ報告として整理できた
- [ ] PR 提出まで一通り完了できた

---

## 課題提出

この章には提出課題があります。

1. 上記のハンズオン課題を完了する
2. GitHub で `feature/05-test-execution` ブランチを作成し、`develop` へのPRを作成（base=`develop`）
3. [AI総合レビューツール](https://ai.studio/apps/drive/1AMqIqU4Bio4te7AWh5dly1Qzp7CesqP9?fullscreenApplet=true) でレビューを実行
4. 問題がなければ、スプレッドシートに **PR URL** と **完了日** を記入
