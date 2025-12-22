"use strict";
const now = new Date();
const year = now.getFullYear();
// 初期値として「今月」を入れておく
let month = now.getMonth();

// process.argvを調べていく
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "-m") {
    // 1. -m の「次」の要素を取得する
    const monthInput = process.argv[i + 1];
    // ステップ2: 文字から数字に変換
    const monthNum = parseInt(monthInput);
    // 3. その値が 1〜12 の範囲内かチェックする
    if (monthNum >= 1 && monthNum <= 12) {
      month = monthNum - 1;
    } else {
      console.error(
        `エラー: ${monthNum}は正しい月ではありません (1〜12を指定してください)`
      );
      process.exit(1);
    }
  }
}

// 1. 1日の曜日インデックスの取得
const firstDayofMonth = new Date(year, month, 1);
const firstDayofweek = firstDayofMonth.getDay();

// 2. 月の末日の取得 (翌月の0日テクニック)
const lastDayOfMonth = new Date(year, month + 1, 0);
const totalDays = lastDayOfMonth.getDate();

console.log(`      ${month + 1}月 ${year}`);
console.log("日 月 火 水 木 金 土");

// カレンダーのマス目の通し番号
let dayCounter = 0;
// A. 1日までの空白を描画
for (let i = 0; i < firstDayofweek; i++) {
  process.stdout.write("   ");
  dayCounter++;
}
// B. 1日目から31日までを出力
for (let i = 1; i <= totalDays; i++) {
  if (i < 10) {
    process.stdout.write(" " + i + " ");
  } else {
    process.stdout.write(i + " ");
  }
  dayCounter++;
  if (dayCounter % 7 === 0) {
    console.log("");
  }
}
console.log("");
console.log("");
