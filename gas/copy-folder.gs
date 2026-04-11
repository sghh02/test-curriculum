/**
 * テストプログラム Drive コピー用 GAS Webアプリ
 *
 * デプロイ設定:
 *   - 実行者: アクセスしたユーザー
 *   - アクセス: 全員（または組織内の全員）
 *
 * 使い方:
 *   1. このスクリプトを Apps Script エディタに貼り付ける
 *   2. index.html を HTML ファイルとして追加する
 *   3. SOURCE_FOLDER_ID を共有 Drive のフォルダ ID に書き換える
 *   4. Webアプリとしてデプロイする
 */

/** コピー元の共有 Drive フォルダ ID */
var SOURCE_FOLDER_ID = '1ebJdmQzaUxg4FTSC79mCN1kYw_QPtBa0';

/**
 * Webアプリのエントリポイント — HTMLフォームを返す
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('テストプログラムのコピー')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * フォームから呼び出される — フォルダをコピーする
 * @param {string} userName 受講者の氏名
 * @return {string} 結果メッセージ
 */
function copyTestProgram(userName) {
  if (!userName || userName.trim() === '') {
    throw new Error('名前を入力してください。');
  }

  var name = userName.trim();
  var date = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd');
  var destName = 'テストプログラム_' + name + '_' + date;

  // 同名フォルダが既にあるか確認
  var existing = DriveApp.getRootFolder().getFoldersByName(destName);
  if (existing.hasNext()) {
    throw new Error(
      '「' + destName + '」は既にマイドライブにあります。\n' +
      '同じ日に2回コピーする必要はありません。'
    );
  }

  var sourceFolder = DriveApp.getFolderById(SOURCE_FOLDER_ID);
  var destFolder = DriveApp.getRootFolder().createFolder(destName);

  copyFolderContents_(sourceFolder, destFolder);

  return '「' + destName + '」をマイドライブに作成しました。';
}

/**
 * フォルダの中身を再帰的にコピーする
 * @param {Folder} source コピー元フォルダ
 * @param {Folder} dest   コピー先フォルダ
 */
function copyFolderContents_(source, dest) {
  // ファイルをコピー
  var files = source.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    file.makeCopy(file.getName(), dest);
  }

  // サブフォルダを再帰的にコピー
  var subFolders = source.getFolders();
  while (subFolders.hasNext()) {
    var sub = subFolders.next();
    var newSub = dest.createFolder(sub.getName());
    copyFolderContents_(sub, newSub);
  }
}
