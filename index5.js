const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzM3Mjg0MDk0ODQ0NzMxNDM0.Xx7HUg.IhmMfZYqwAHhZx9FGAFS4sofy8Y';
const welcomeChannelName = "오하요우";
const byeChannelName = "사요나라";
const welcomeChannelComment = "오하요우.";
const byeChannelComment = "사요나라.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('현재는 사용 불가입니다');
  }

  if(message.content == 'embed') {
    let img = 'https://kin-phinf.pstatic.net/20200713_226/15945752559537eFmx_JPEG/20200713_023405.jpg?type=w750';
    let embed = new Discord.RichEmbed()
      .setTitle('봇 설명')
      .setURL('http://www.naver.com')
      .setAuthor('Kaiop', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('시논 봇', '현재는 기본 설정만 된 봇입니다')
      .addField('버그 제보', 'Kaiop#4297로 dm 부탁드립니다', true)
      .addField('오류 제보', 'Kaiop#4297로 dm 부탁드립니다', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('점검', '버그나 오류 들어올때 할겁니다\n명령어 추가는 곧 할 예정입니다\n2주마다 한번은 점검 할 예정입니다\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Kaiop 공지', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '사용 불가'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: 'k전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of Sinon BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`Sinon BOT ❤`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('k전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('k전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasBotPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);