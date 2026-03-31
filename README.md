# テストプログラム

品質の見方を学びながら、結合試験と単体試験の入口を体験し、初回のテスト案件に入る前の準備を整えるプログラムです。

ディレクトリ名は互換性のため `test-curriculum/` のまま管理しています。

実施媒体はスプレッドシートを前提とし、この教材側では環境準備、教材導線、提出ルールを案内します。

## 構成

- `index.json`: viewer 用の目次
- `chapters/`: viewer に表示する本文
- `templates/`: 下書きや補助メモに使うテンプレ
- `legacy/`: 旧 Notion 書き出しの保管場所

## 外部教材

実施用の APK、設計書、スプレッドシート、参考資料は次の共有 Drive を基準に運用します。
root 直下は `単体テスト` と `結合テスト` の 2 フォルダ構成です。
学習開始時にこの共有 Drive を自分の Google Drive にコピーし、以後はコピー側を作業用テストプログラムとして使います。

- [テストプログラム Drive](https://drive.google.com/drive/folders/1ebJdmQzaUxg4FTSC79mCN1kYw_QPtBa0)

## 検証

```bash
node scripts/validate-index.mjs
```
