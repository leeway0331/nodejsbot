const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzM3Mjg0MDk0ODQ0NzMxNDM0.Xx7HUg.2_sNtGWbgx0BE0H6TViJInBcXMk';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('현재는 사용 불가입니다');
  }
});

client.login(token);