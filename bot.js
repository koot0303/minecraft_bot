const mineflayer = require('mineflayer');

// ボットの接続情報を設定
const bot = mineflayer.createBot({
  host: 'localhost', // 接続したいサーバーのIPアドレス
  port: 50000,       // サーバーのポート番号 (通常は25565)
  username: 'Bot', // ボットの名前
  // auth: 'microsoft' // Microsoftアカウントで認証する場合
  // version: '1.20.1' // サーバーのバージョンを明示的に指定する場合
});

// ボットがサーバーにログインしたときに一度だけ実行される処理
bot.once('spawn', () => {
  console.log('ボットがサーバーにログインしました。');
  bot.chat('やあ');
});

// チャットメッセージを受信したときに実行される処理
bot.on('chat', (username, message) => {
  // 自分のメッセージは無視する
  if (username === bot.username) return;

  // コンソールにチャット内容を表示
  console.log(`${username}: ${message}`);

  // !bot_comeon 
  if (message === '!bot_comeon') {
    console.log(`${username} からテレポート要求を受けました。`);

    // プレイヤーが見つからない場合のエラー処理
    const player = bot.players[username];
    if (!player) {
      bot.chat('エラー：あなたの情報が見つかりません。');
      return;
    }

    // テレポートコマンドを実行してプレイヤーの元へ移動
    // ※ボットがOP権限を持っている必要があります
    bot.chat(`/tp ${username}`);
    
    bot.chat(`${username} へテレポートしました。`);
  }

   // !bot_exit 
  if (message === '!bot_exit') {
    console.log(`${username} により退出コマンドが実行されました。`);
    // お別れの挨拶をする
    bot.chat('さようなら！サーバーから退出します。');

    // チャットメッセージが送信されるのを少し待ってから切断する
    setTimeout(() => {
      bot.quit();
    }, 500); // 0.5秒後に実行
  }
});

// サーバーから切断されたときの処理
bot.on('kicked', (reason) => console.log(`サーバーからキックされました: ${reason}`));
// エラーが発生したときの処理
bot.on('error', (err) => console.log(`エラーが発生しました: ${err}`));