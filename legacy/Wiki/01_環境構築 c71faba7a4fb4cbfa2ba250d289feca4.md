# 01_環境構築

# **環境構築**

以下の手順でプログラムを進めていく環境を構築して行きましょう！
最初の環境構築でつまずくパターンもよくあるのでその都度質問してください！

## Android端末がない場合はAndroid Studioを
インストールしてください ※Android端末がない場合

- [こちらを見ながらAndroid Studioのインストールを行ってください](https://codeforfun.jp/how-to-install-android-studio-windows-and-mac/)

Android端末がない場合、[エミュレータ](https://wa3.i-3-i.info/word12676.html)を使用しアプリのテストをする必要があるためインストールします。
https://codeforfun.jp/android-studio-how-to-install-emulator/

## **adbコマンド使用しアプリをインストールする**

Mac、WindowsどちらもAndroidStudioのインストールは済んでいるのでとばしてください。

- [Macの人はこちらを見ながらadbコマンドを使えるようにする](https://sp7pc.com/google/android/17843)
- [Windowsの人はこちらを見ながらadbコマンドを使えるようにする](https://sp7pc.com/google/android/34263)

Android端末に今回テストするアプリをインストールするためにadbコマンドを使えるようにします。

## **adbコマンドが使えるようになりPCとAndroid端末の
接続ができたら次の手順でアプリをインストールしてください**

※ PCとAndroid端末の接続ができているかどうかは[**adbの動作検証をする**](https://sp7pc.com/google/android/17843#toc7)にやり方が記載されているので確認してください。

![ic_launcher-playstore.png](01_%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89/ic_launcher-playstore.png)

1. [app-debug.apk](https://drive.google.com/file/d/1y7CGm1B7Y0dvEPwGUYlQ8hdbqAOMine5/view?usp=drive_link)こちらをダウンロードする(上の画像がアプリアイコンです。)
2. Macの人はターミナル、Windowsの人はコマンドプロンプトを開く
3. `adb install`←をコピペする ※installの後ろに半角スペース入れるの忘れずに
4. 1でダウンロードしたapkファイルをターミナルまたはコマンドプロンプトにドラッグアンドドロップする。
5. Enter
6. ターミナルまたはコマンドプロンプトでSuccessがでれば成功

# 環境構築が終わったらプログラムの進め方へ

[02_プログラムの進め方](02_%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E3%81%AE%E9%80%B2%E3%82%81%E6%96%B9%20c5f0a074d51d4d7e800557bde084f8f6.md)