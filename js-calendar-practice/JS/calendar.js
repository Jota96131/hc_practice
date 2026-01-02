"use strict";
const now = new Date();
const year = now.getFullYear();
// 初期値として「今月」を入れておく
let month = now.getMonth();

// process.argvを調べていく
const [_, __, keyword, argMonth] = process.argv;
// argMonth が存在する場合のみ処理
if (argMonth) {
  const monthNum = parseInt(argMonth);
  if (monthNum >= 1 && monthNum <= 12) {
    month = monthNum - 1;
  } else {
    console.error(
      `エラー: ${monthNum}は正しい月ではありません (1〜12を指定してください)`
    );
    process.exit(1);
  }
}

// 1. 1日の曜日インデックスの取得
const firstDayOfMonth = new Date(year, month, 1);
const firstDayOfWeek = firstDayOfMonth.getDay();

// 2. 月の末日の取得 (翌月の0日テクニック)
const lastDayOfMonth = new Date(year, month + 1, 0);
const totalDays = lastDayOfMonth.getDate();

console.log(`      ${month + 1}月 ${year}`);
console.log("日 月 火 水 木 金 土");

let dayCounter = firstDayOfWeek;
// A. 1日までの空白を描画
process.stdout.write("   ".repeat(firstDayOfWeek));
// B. 1日目から31日までを出力
for (let i = 1; i <= totalDays; i++) {
  process.stdout.write(String(i).padStart(2, " ") + " ");
  dayCounter++;
  if (dayCounter % 7 === 0) {
    console.log("");
  }
}
console.log("");
console.log("");
