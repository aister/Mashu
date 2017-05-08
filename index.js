const Discord = require("discord.js");
const client = { embed: { color: 0x683b62 }};
let temp;
client.bot = new Discord.Client();
if (!process.env.MashuBot) {
  temp = require('./config.json');
  apiai = temp.apiai;
  client.token = temp.token;
  client.prefix = "hey mashu, ";
  client.selfbot = true;
  client.embed.author = { name: "Mashu Kyrielight" };
  client.embed.footer = { text: "Mashu Selfbot - designed by Aister" };
}
else {
  client.token = process.env.MashuBot;
  apiai = process.env.ApiAi;
  client.prefix = "mashu, ";
  client.selfbot = false;
}
client.load = require('./load.js');
client.db = require('redis').createClient(process.env.REDIS_URL);
time = Date.now();
client.load(client, () => {
  taken = Date.now() - time;
  time += taken;
  console.log(`Modules loaded, took ${taken}ms in total`);
  console.log('Logging in Discord...');
  client.bot.on('ready', () => {
    taken = Date.now() - time;
    console.log(`Mashu is ready, senpai! Logging in took me ${taken}ms`); });
  client.bot.on('disconnect', () => {
    time = Date.now();
  })
  client.bot.on('guildCreate', () => {
    if (!client.selfbot && (channel = client.bot.channels.get('265147163321958400'))) channel.sendMessage(client.bot.user.username + " has been added to another guild! Total guild count: " + client.bot.guilds.size);
  });
  client.bot.on('guildDelete', () => {
    if (!client.selfbot && (channel = client.bot.channels.get('265147163321958400'))) channel.sendMessage(client.bot.user.username + " has been removed from a guild! Total guild count: " + client.bot.guilds.size);
  });
  client.bot.login(client.token).catch(console.log);
  client.bot.on('message', (message) => {

    if (message.author.bot) return;
    if (client.selfbot && client.bot.user.id != message.author.id) return;
    content = message.content.toLowerCase();


    client.reply = false;
    client.name = message.author.username;
    if (message.member && message.member.nickname) client.name = message.member.nickname;
    message.send = function (desc, emotion) {
      embed = client.embed;
      desc = desc.slice(0, 1).toUpperCase() + desc.slice(1);
      embed.description = desc.replace(/senpai/gi, client.name + '-senpai').replace(/\[s]/gi, 'senpai');
      if (emotion) embed.thumbnail = { url: client.emote[emotion] };
      else {
        if (Math.random() > 0.5) embed.thumbnail = { url: client.emote["default"] };
        else embed.thumbnail = { url: client.emote["smile"] };
      }
      this.channel.sendMessage("", { embed });
      client.reply = true;
    }

    if (!content.startsWith(client.prefix)) {
      if (content.match(/thx,? mashu|thanks,? mashu|thank you,? mashu/g)) {
        message.send("You're welcome senpai.", "smile");
      } else if (content.match(/it's ok,? mashu/g)) {
        message.send("I'll try better next time, senpai");
      } else if (content.match(/\bright,? mashu\b/g)) {
        message.send("Yes, senpai.");
      } else if (content.match(/good job,? mashu|gj,? mashu|nice,? mashu/g)) {
        message.send("Thank you senpai. I will try my best!", "embarassed");
      }
      return;
    }
    content = message.content.slice(client.prefix.length);
    temp = content.split('"');
    args = false;
    if (temp.length > 2) {
      args = temp.splice(1, 1)[0];
      content = temp.join('"');
    } else {
      temp = content.split('\n');
      if (temp.length > 1) {
        args = temp.slice(1).join('\n');
        content = temp[0]; 
      }
    }
    content = content.toLowerCase();
    if (command = content.match(client.commandRegex)) {
      client.commands[command[0]].count++;
      client.commands[command[0]].exec(client, message, content, args);
    }
    if (!client.reply) {
      message.channel.startTyping();
      request({
        url: "https://api.api.ai/v1/query?lang=en&v=20150910&sessionId=be040598-37cd-4021-8ac7-706376544306&query=" + encodeURI(message.content.slice(client.prefix.length)),
              json: true,
              headers: {
                'Authorization': 'Bearer ' + apiai
              }
      }, function(err, res, body) {
        if (err) console.log(err);
        else if (body.result.action) message.send(body.result.fulfillment.speech, body.result.action);
        else message.send(body.result.fulfillment.speech);
        message.channel.stopTyping();
      });

    }
  });
});