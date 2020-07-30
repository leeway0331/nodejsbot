const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzM3Mjg0MDk0ODQ0NzMxNDM0.Xx7HUg.IhmMfZYqwAHhZx9FGAFS4sofy8Y';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('현재는 사용 불가입니다');
  }
});

client.login(token);