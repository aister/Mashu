var Discord = require("discord.js");
var util = require('util');
var request = require('request');
var translate = require('google-translate-api');
if (!process.env.MashuBot) {
  token = require('./config.json');
  apiai = token.apiai;
  token = token.token;
  prefix = "hey mashu, "
}
else {
  token = process.env.MashuBot;
  apiai = process.env.ApiAi;
  prefix = "mashu, "
}
bot = new Discord.Client();
var tzOffset = {"pst": -8,"pdt": -7,"est": -5,"edt": -4,"jst": 9,"dst": 1}
var emote = { "default": "http://i.imgur.com/gahpkzl.png", "serious": "http://i.imgur.com/a30T4gX.png", "embarassed": "http://i.imgur.com/Net4Qyq.png", "flustered": "http://i.imgur.com/VEWDYD5.png", "smile": "http://i.imgur.com/lvSSKGX.png" }
var regex = [];
var timer = {};
for (var item in tzOffset) {
  regex.push(item);
}
regex = new RegExp(regex.join("|") + "|gmt[+-]\\d\\d?|utc[+-]\\d\\d?", "g");
bot.on('message', (message) => {
  if (message.author.bot) return;
  if (message.member && message.member.nickname) name = message.member.nickname;
  else name = message.author.username;
  embed = {
    color: 0x683b62
  };
  content = message.content.toLowerCase();
  reply = false;
  message.send = function (desc, emotion) {
    desc = desc.slice(0, 1).toUpperCase() + desc.slice(1);
    embed.description = desc.replace(/senpai/gi, name + '-senpai');
    if (emotion) embed.thumbnail = { url: emote[emotion] };
    else {
      if (Math.random() > 0.5) embed.thumbnail = { url: emote["default"] };
      else embed.thumbnail = { url: emote["smile"] };
    }
    this.channel.sendMessage("", { embed });
    reply = true;
  }
  if (!content.startsWith(prefix)) {
    if (content.match(/thx,? mashu|thanks,? mashu|thank you,? mashu/g)) {
      message.send("You're welcome senpai.", "smile");
    } else if (content.match(/it's ok,? mashu/g)) {
      message.send("I'll try better next time, senpai");
    } else if (content.match(/\bright,? mashu\b/g)) {
      message.send("Yes, senpai.");
    } else if (content.match(/good job,? mashu|gj,? mashu|nice,? mashu/g)) {
      message.send("Thank you senpai. I will try my best!", "embarassed");
    }
  } else {
    content = message.content.slice(prefix.length).split('\n');
    args = content.slice(1);
    content = content[0];
    args2 = content.match(/"[^"]+"/g);
    if (args2) {
      args2 = args2[0].slice(1, -1);
      content = content.match(/^[^"]*"/g)[0].slice(0, -1) + content.match(/"[^"]*$/g)[0].slice(1);
    } else args2 = false;
    if (args.length) args = args.join(" ").trim();
    else args = false;
    content = content.toLowerCase();
    if (content.match(/\by?o?u there\b/g)) {
      message.send("Yes senpai. I'm here.");
    } else if (content.match(/\beval\b/g) && message.author.id == "184369428002111488") {
      if (args) {
        try {
          args = eval(args);
          if (typeof args == "object") args = util.inspect(args, {depth: 0});
          if (typeof args == "string") {
            reg = new RegExp(bot.token.replace(/\./g, "\\."), 'g');
            args = args.replace(reg, 'Removed');
          }
          message.send("Of course senpai, here it is:\n```js\n" + args + "\n```");
        } catch(err) {
          message.send("senpai, there's an error in your code: \n```js\n" + err + "\n```", "serious");
        }
      } else {
        message.send("senpai, how do you expect me to eval when there's no code?", "serious");
      }
    } else if (content.match(/\bnote\b/g) && message.author.id == "184369428002111488") {
      if (args2) {
        message.send("Surely senpai, I will take note for you. The note is:\n\n" + args2);
        bot.channels.get("222555996994666496").sendMessage(args2);
      } else {
        message.send("senpai, there's nothing to note. Oh I understand, there's noteing to note, right? Huh? No? OK then...");
      }
    } else if (content.match(/\btimer\b/g)) {
      if (content.match(/\bstart\b/g)) {
        timer[message.author.id] = Date.now();
        message.send("Roger! The timer has started! Good luck, senpai!");
      } else if (content.match(/\bstop\b/g)) {
        if (timer[message.author.id]) {
          timer[message.author.id] = Date.now() - timer[message.author.id];
          h = Math.floor(timer[message.author.id] / 3600000);
          if (h < 10) h = "0" + h;
          timer[message.author.id] = timer[message.author.id] % 3600000;
          m = Math.floor(timer[message.author.id] / 60000);
          if (m < 10) m = "0" + m;
          timer[message.author.id] = timer[message.author.id] % 60000;
          s = Math.floor(timer[message.author.id] / 1000);
          if (s < 10) s = "0" + s;
          timer[message.author.id] = timer[message.author.id] % 1000;
          if (timer[message.author.id] < 10) timer[message.author.id] = "0" + timer[message.author.id];
          message.send("The timer has stopped! The screen says " + h + ":" + m + ":" + s + "." + timer[message.author.id] + ", senpai!");
          delete timer[message.author.id];
        }
      }
    } else if (content.match(/\bsearch\b/g)) {
      if (args2) {
        reply = true;
        message.channel.startTyping();
        request('https://www.google.com/search?safe=active&q=' + encodeURI(args2), function(err, res, body) {
          if (err) console.log(err);
          else {
            if (body.indexOf('/url?q=') > -1) {
              body = body.slice(body.indexOf('/url?q=') + 7);
              body = body.slice(0, body.indexOf('&'));
              body = decodeURIComponent(body);
              message.send("senpai, I found this website. I hope this is what you are looking for.\n" + body);
            } else message.send("Sorry senpai, I couldn't find anything");
            message.channel.stopTyping();
          }
        });
      }
    } else if (content.match(/\btwitter\b/g)) {
      message.send("Surely, senpai, please wait a moment");
      pinned = content.match(/\bpin(?:ned)?\b/g);
      request('https://twitter.com/fgo_english', function (err, res, body) {
        body = body.slice(body.indexOf('id="timeline"'));
        body = body.slice(0, body.indexOf('class="stream-footer"'));
        body = body.split('<li class="js-stream-item').slice(1, -1);
        result = "";
        body.forEach(item => {
          if (!result) {
            if ((pinned && item.includes('js-pinned')) || (!pinned && !item.includes('js-pinned'))) {
              result = item.slice(item.indexOf('data-item-id="') + 14);
              result = result.slice(0, result.indexOf('"'));
              message.channel.sendMessage("https://www.twitter.com/fgo_english/status/" + result);
            }
          }
        });
      });
    } else if (content.match(/\brepeat\b/g)) {
      if (args2) message.send(args2);
    } else if (content.match(/\bstat\b/g)) {
      temp = embed;
      temp.description = "Sure " + name + "-senpai, here is my stat:";
      temp.fields = [
        {
          name: "Bot uptime",
          value: Math.floor(bot.uptime / 864000000) + 'd : ' + (Math.floor(bot.uptime / 3600000) % 24) + 'h : ' + (Math.floor(bot.uptime / 60000) % 60) + 'm : ' + (Math.floor(bot.uptime / 1000) % 60) + 's',
          inline: true
        },
        {
          name: "Process uptime",
          value: Math.floor(process.uptime() / 864000) + 'd : ' + (Math.floor(process.uptime() / 3600) % 24) + 'h : ' + (Math.floor(process.uptime() / 60) % 60) + 'm : ' + (Math.floor(process.uptime()) % 60) + 's',
          inline: true
        },
        {
          name: "Total Servers",
          value: bot.guilds.size,
          inline: true
        },
        {
          name: "Total Channels",
          value: bot.channels.size,
          inline: true
        },
        {
          name: "Total Cached Users",
          value: bot.users.size,
          inline: true
        },
        {
          name: "Memory Usage",
          value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB',
          inline: true
        }
      ];
      if (Math.random() > 0.5) temp.thumbnail = { url: emote["default"] };
      else temp.thumbnail = { url: emote["smile"] };
      message.channel.sendMessage('', { embed: temp });
      reply = true;
    } else if (content.match(/\btranslate\b/g)) {
      message.send("I'll try my best to translate it for you, senpai");
      translate(args2, {to: 'en'}).then(res => {
        message.send("Done! Here's the translation:```\n" + res.text + '```');
      });
    } else if (content.match(/\bservant info\b/g)) {
      if (args2) {
        if (args2.startsWith('id:')) args2 = "http://aister.site90.com/api.php?mode=servants&c=dataID&query=" + encodeURI(args2.slice(3));
        else args2 = "http://aister.site90.com/api.php?mode=servants&c=name&query=" + encodeURI(args2);
        message.channel.startTyping();
        message.send("Surely, senpai, please wait a moment");
        request({ url: args2, json: true, followRedirect: false }, function(err, res, body) {
          message.channel.stopTyping();
          if (res.statusCode != 302 && body.item) {
            body = body.item;
            attack = body.attacks.replace(/.{2}/g, function (match) {
              switch (match) {
                case "01": return "Quick, ";
                case "02": return "Arts, ";
                case "03": return "Buster, ";
              }
            }).slice(0, -2);
            field = [
              {
                name: "Class",
                value: body.class,
                inline: true
              },
              {
                name: "Cost",
                value: body.cost,
                inline: true
              },
              {
                name: "HP",
                value: body.baseHP + ' (' + body.maxHP + ')',
                inline: true
              },
              {
                name: "ATK",
                value: body.baseATK + ' (' + body.maxATK + ')',
                inline: true
              },
              {
                name: "Attacks",
                value: attack
              },
              {
                name: "Description",
                value: body.description.replace(/<br>/g, '\n')
              }
            ];
            if (body.note && body.note != ' ') {
              field.push({
                name: 'Note',
                value: body.note
              });
            }
            servant = {
              title: body.name + ' (ID: ' + body.dataID + ')',
              color: 0xff0000,
              fields: field,
              thumbnail: {
                url: body.image
              },
              url: body.link
            }
            message.channel.sendMessage('', { embed: servant });
          } else message.send("I'm sorry, senpai, I couldn't find anything at all")
        });
      }
    } else if (content.match(/\bcommands?\b/g)) {
      message.send("If you need my command list, please read this [LINK](https://github.com/aister/Mashu/blob/master/README.md), senpai")
    } else if (content.match(/\bselfie\b/g)) {
      message.send("Surely, senpai, please wait a moment");
      selfie = embed;
      request({
        url: 'https://safebooru.donmai.us/posts.json?random=true&limit=1&tags=shielder_%28fate%2Fgrand_order%29',
        json: true
      }, function (err, temp, body) {
        if (!err && body.length > 0 && body[0].file_url) {
          selfie.image = { url: "https://safebooru.donmai.us/" + body[0].file_url };
          selfie.description = "Here you go senpai";
          selfie.thumbnail = { url: emote.embarassed };
          message.channel.sendMessage("", { embed: selfie });
        } else message.send("I'm sorry senpai, the camera is broken");
      });
    } else if (content.match(/\binvite\b/g)) {
      message.send("Please use this [LINK](https://discordapp.com/oauth2/authorize?client_id=259634602199482368&scope=bot) to invite me to your server, senpai");
    } else if (content.match(/\btime\b/g)) {
      var date = new Date();
      localTZ = Math.floor(date.getTimezoneOffset() / 60) * -1;
      if (match = content.match(/\d\d:\d\d/g)) {
        match = match[0];
        h = parseInt(match.slice(0, 2));
        m = match.slice(3);
        if (tz = content.match(regex)) {
          tz = tz[0];
          if (tzOffset[tz]) offset = tzOffset[tz];
          else offset = parseInt(tz.slice(3));
          if (offset < -11 || offset > 12) {
            message.send("senpai, that timezone is invalid!", "serious");
          } else {
            if (content.startsWith("what") || content.startsWith("wat")) {
              if (content.indexOf(tz) < content.indexOf('local')) {
                h = offset - localTZ + h;
              } else {
                h = h - offset + localTZ;
              }
            } else {
              if (content.indexOf(tz) > content.indexOf('local')) {
                h = offset - localTZ + h;
              } else {
                h = h - offset + localTZ;
              }
            }
            info = tz.toUpperCase();
            if (h >= 24) {
              h -= 24;
              info += " in the next day";
            } else if (h < 0) {
              h += 24;
              info += " in the previous day";
            } else {
              info += " in the same day";
            }
            if (h < 10) h = "0" + h;
            message.send("It will be " + h + ":" + m + " at " + info + ", senpai.");
          }
        }
      } else {
        if (match = content.match(regex)) {
          if (tzOffset[match[0]]) offset = tzOffset[match[0]];
          else offset = parseInt(match[0].slice(3));
          if (offset < -11 || offset > 12) {
            message.send("senpai, that timezone is invalid!", "serious");
          } else {
            offset = offset * 60 * 60 * 1000;
            date.setTime( date.getTime() + offset );
            message.send("senpai, the current time in " + match[0].toUpperCase() + " is " + date.toUTCString().slice(0, -3));
          }
        } else {
          message.send("senpai, the current local time is " + date.toLocaleString());
        }
      }
    }
    if (!reply) {
      message.channel.startTyping();
      request({
        url: "https://api.api.ai/v1/query?lang=en&v=20150910&sessionId=be040598-37cd-4021-8ac7-706376544306&query=" + encodeURI(message.content.slice(prefix.length)),
              json: true,
              headers: {
                'Authorization': 'Bearer ' + apiai
              }
      }, function(err, res, body) {
        if (err) console.log(err);
        else message.send(body.result.fulfillment.speech, body.result.action);
        message.channel.stopTyping();
      });
    }
  }
});
bot.on('ready', () => { console.log("Mashu is ready, senpai!"); });
bot.login(token).catch(console.log);