# 第3章: 実施環境を準備する

> この章では「APK を入れること」だけでなく、**公式情報をAIに整理させながら、自分の端末で環境構築を進める型** も身につけます。

## この章のゴール

- 自分の PC で課題に着手するための前提をそろえられる
- 必要に応じて APK を Android 実機へ導入できる
- 次章で使う Drive の教材へ迷わず入れる
- 公式情報と AI を使って、環境構築を自力で進める流れを試せる

## 最初に確認すること

このプログラムでは、次の2つを使います。

1. このプログラムの教材本文
2. 講義用 Drive にある APK・設計書・スプレッドシート

最初に、次の共有フォルダへアクセスできるか確認してください。

- 共有フォルダ: [テストプログラム Drive](https://drive.google.com/drive/folders/1ebJdmQzaUxg4FTSC79mCN1kYw_QPtBa0)

アクセスできない場合は、その時点で作業を止めて講師へすぐ連絡してください。
アクセスできたら、次章の手順に従って [テストプログラムのコピーツール](https://script.google.com/macros/s/AKfycbwzs-L_XKZMLCvhF8_RaY3WYz2mpDHIs56qpg_UiGCMiayScX9f6h2HCE11JvCbTjBjrw/exec) から自分のマイドライブにコピーし、以後はその作業用コピーを使います。

## この章で使うもの

- Android 実機
- `adb` コマンドが使える環境
- 課題用 APK
  - 共有 Drive の `結合テスト > apk > app-debug.apk`
- Android 公式情報
  - [Run apps on a hardware device](https://developer.android.com/studio/run/device?hl=ja)
  - [SDK Platform-Tools release notes](https://developer.android.com/tools/releases/platform-tools?hl=ja)
  - [Android Debug Bridge (adb)](https://developer.android.com/tools/adb?hl=ja)

## AIと公式情報で環境構築する

環境構築は、端末や PC の状態によって見え方が少しずつ変わります。  
だから大事なのは、**手順を丸暗記すること**ではなく、**公式情報を根拠に AI へ整理させ、自分の画面と照合しながら進めること**です。

この章では、次の Android 公式情報だけを使うのが安全です。

- Android 公式: [Run apps on a hardware device](https://developer.android.com/studio/run/device?hl=ja)
- Android 公式: [SDK Platform-Tools release notes](https://developer.android.com/tools/releases/platform-tools?hl=ja)
- Android 公式: [Android Debug Bridge (adb)](https://developer.android.com/tools/adb?hl=ja)

### AIへの頼み方

AI に頼むときは、**参照元を限定する** のが大事です。

コピペ用:

```text
以下の公式URLだけを参照して、Android実機でAPKを導入する手順を初心者向けに整理してください。
- 必須手順
- つまずきやすい点
- できた状態
を分けて書いてください。
公式ページに書いていないことは推測せず、「不明」と書いてください。

- https://developer.android.com/studio/run/device?hl=ja
- https://developer.android.com/tools/releases/platform-tools?hl=ja
- https://developer.android.com/tools/adb?hl=ja
```

ここで身につけたいのは、**分からない → 公式を見る → AI に整理させる → 自分の端末画面で確認する** という流れです。

## 進め方

### 1. Android 実機があるか確認する

このプログラムは **Android 実機のみ** を前提に進めます。

- Android 実機がある場合
  - このまま次へ進みます
- Android 実機がない場合
  - その時点で作業を止めて講師へすぐ連絡してください

**できた状態**：課題で使う Android 実機が手元にある。

### 2. すでにアプリが入っているか確認する

Android 実機のホーム画面やアプリ一覧を開き、対象アプリがすでに入っているか確認します。

確認したいのは、次のアイコンです。

![対象アプリアイコン](./images/ic_launcher-playstore.png)

- このアイコンがすでにある場合
  - APK のインストールは省いて構いません
  - アプリの起動確認だけ行って次へ進みます
- このアイコンがない場合
  - 下の折りたたみを開いて、APK を入れる手順を進めてください

**できた状態**：アプリがすでに入っているか、まだ入っていないかを判断できた。

<details>
<summary>アプリが入っていない場合：APK を入れる手順（ステップ 3〜6）</summary>

### 3. USB デバッグと接続準備を確認する

Android 公式の [Run apps on a hardware device](https://developer.android.com/studio/run/device?hl=ja) を参照しながら、実機で USB デバッグが使える状態にします。

最低限確認すること:

- 開発者向けオプションを有効にする
- USB デバッグを有効にする
- USB ケーブルで PC と実機を接続する
- 実機側に確認ダイアログが出たら許可する

ここは端末ごとに表示名が少し違うことがあるので、迷ったら上の公式ページを AI に整理させてから進めてください。

**できた状態**：実機を PC につなぎ、USB デバッグを許可できた。

### 4. `adb` が使えるか確認する

ターミナルまたはコマンドプロンプトで、まず `adb` が呼べるか確認します。

```bash
adb version
```

コマンドが見つからない場合は、Android SDK Platform Tools の導入や PATH 設定が必要です。
その場合は、Android 公式の [SDK Platform-Tools release notes](https://developer.android.com/tools/releases/platform-tools?hl=ja) を参照して導入します。

**できた状態**：`adb version` が実行できる。

### 5. 実機接続を確認する

実機を接続した状態で、次を実行します。

```bash
adb devices
```

1 台以上表示されれば次へ進めます。
表示されない場合は、USB ケーブル接続、USB デバッグ許可、実機側の確認ダイアログを見直します。

**できた状態**：`adb devices` に接続した Android 実機が表示される。

### 6. APK を端末へ導入する

共有 Drive の `結合テスト > apk > app-debug.apk` をダウンロードし、保存場所を確認してからインストールします。

```bash
adb install /path/to/app-debug.apk
```

すでに同じパッケージが入っていて失敗した場合は、既存アプリを削除してから再実行してください。

**できた状態**：インストール後、実機に対象アプリのアイコンが表示される。

</details>

### 7. 起動確認をする

アイコンが最初からあった場合も、APK を入れた場合も、最後に端末で対象アプリを開きます。
次が確認できれば、この章は完了です。

- ホーム画面またはアプリ一覧に、上の画像と同じアイコンが表示される
- アプリが起動する
- 初期画面まで進める
- 明らかなクラッシュがない

## よくあるミス

- `adb` は入っているが PATH が通っていない
- 端末の USB デバッグが有効になっていない
- Android 実機がないのに、そのまま進めようとしてしまう
- すでにアプリが入っているのに毎回 APK を入れ直してしまう
- APK は入ったが、実際に起動確認していない

## AIに聞いてみよう

```text
目的：テスト課題の事前準備を完了したい
現状：Drive の共有フォルダには入れたが、Android 実機の準備と APK 導入が不安
詰まりポイント：USB デバッグ、adb の確認、アプリアイコン確認の順番が曖昧
自分の仮説：実機接続、adb devices、アイコン確認、必要なら adb install の順で進めればよさそう
確認したいこと：この公式URLだけを参照して、「すでにアプリが入っている場合」と「まだ入っていない場合」に分けて、実機での環境構築手順を初心者向けに整理して
```

## チェックリスト

- [ ] 共有 Drive へアクセスできた
- [ ] Android 実機があることを確認できた
- [ ] 対象アプリのアイコンがあるか確認できた
- [ ] 必要な場合だけ `adb version` と `adb devices` を確認できた
- [ ] 必要に応じて `app-debug.apk` を導入し、起動確認できた
- [ ] 公式情報をAIに整理させて、自分の端末と照合する流れを試せた

---

## 完了記録

この章には提出課題はありません。
学習が完了したら、進捗ステータスを完了にしてください。
