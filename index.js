var Discord = require("discord.js");
var util = require('util');
var request = require('request');
if (!process.env.MashuBot) token = require('./config.json').token;
else token = process.env.MashuBot;
bot = new Discord.Client();
var tzOffset = {"pst": -8,"pdt": -7,"est": -5,"edt": -4,"jst": 9,"dst": 1}
var emote = { "default": "http://i.imgur.com/gahpkzl.png", "serious": "http://i.imgur.com/a30T4gX.png", "embarassed": "http://i.imgur.com/BcjWzGc.png" }
var regex = [];
var timer = {};
for (var item in tzOffset) {
  regex.push(item);
}
regex = new RegExp(regex.join("|") + "|GMT[+-]\\d\\d?", "g");
bot.on('message', (message) => {
  if (message.author.bot) return;
  embed = {
    color: 0x683b62
  };
  message.content = message.content.toLowerCase();
  reply = false;
  message.send = function (desc, emotion) {
    desc = desc.slice(0, 1).toUpperCase() + desc.slice(1);
    embed.description = desc;
    if (emotion) embed.thumbnail = { url: emote[emotion] };
    else embed.thumbnail = { url: emote["default"] };
    this.channel.sendMessage("", { embed });
    reply = true;
  }
  if (!message.content.startsWith("mashu, ")) {
    if (["thx mashu", "thanks mashu", "thank you mashu"].includes(message.content)) {
      message.send("You're welcome senpai.");
    } else if (message.content.includes("it's ok mashu")) {
      message.send("I'll try better next time, senpai");
    } else if (message.content.match(/\bright,? mashu\b/g)) {
      message.send("Yes, senpai.");
    } else if (["good job, mashu", "good job mashu", "gj mashu", "nice, mashu"].includes(message.content)) {
      message.send("Thank you senpai. I will try my best!", "embarassed");
    }
  } else {
    content = message.content.slice(7).split('\n');
    args = content.slice(1);
    content = content[0];
    args2 = content.match(/"[^"]+"/g);
    if (args2) {
      args2 = args2[0].slice(1, -1);
      content = content.match(/^[^"]*"/g)[0].slice(0, -1) + content.match(/"[^"]*$/g)[0].slice(1);
    } else args2 = false;
    if (args.length) args = args.join(" ").trim();
    else args = false;
    if (content.match(/\bu there\b/g)) {
      message.send("Yes senpai. I'm here.");
    } else if (content.match(/\beval\b/g) && message.author.id == "184369428002111488") {
      if (args) {
        try {
          args = eval(args);
          if (typeof args == "object") args = util.inspect(args, {depth: 0});
          if (typeof args == "string") {
            reg = new RegExp(bot.token.replace(/\./g, "\\.") + '|' + bot.email.replace(/\./g, "\\.") + '|' + bot.password.replace(/\./g, "\\."), 'g');
            args = args.replace(reg, 'Removed');
          }
          message.send("Of course senpai, here it is:\n```js\n" + args + "\n```");
        } catch(err) {
          message.send("Senpai, there's an error in your code: \n```js\n" + err + "\n```", "serious");
        }
      } else {
        message.send("Senpai, how do you expect me to eval when there's no code?", "serious");
      }
    } else if (content.match(/\bnote\b/g) && message.author.id == "184369428002111488") {
      if (args2) {
        message.send("Surely senpai, I will take note for you. The note is:\n\n" + args2);
        bot.channels.get("222555996994666496").sendMessage(args2);
      } else {
        message.send("Senpai, there's nothing to note. Oh I understand, there's noteing to note, right? Huh? No? OK then...");
      }
    } else if (content.match(/\btimer\b/g)) {
      if (content.match(/\bstart\b/g)) {
        timer[message.author.id] = Date.now();
        message.send("Roger! The timer[message.author.id] has started! Good luck, senpai!");
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
        request('https://www.google.com/search?safe=active&q=' + encodeURI(args2), function(err, res, body) {
          if (err) console.log(err);
          else {
            if (body.indexOf('/url?q=') > -1) {
              body = body.slice(body.indexOf('/url?q=') + 7);
              body = body.slice(0, body.indexOf('&'));
              body = decodeURIComponent(body);
              message.send("Senpai, I found this website. I hope this is what you are looking for.\n" + body);
            } else message.send("Sorry senpai, I couldn't find anything");
          }
        });
      }
    } else if (content.match(/\brepeat\b/g)) {
      if (args2) message.send(args2);
    } else if (content.match(/\bservant info\b/g)) {
      if (args2) {
        if (args2.startsWith('id:')) args2 = "http://aister.site90.com/api.php?mode=servants&c=dataID&query=" + encodeURI(args2.slice(3));
        else args2 = "http://aister.site90.com/api.php?mode=servants&c=name&query=" + encodeURI(args2);
        message.send("Surely, senpai, please wait a moment");
        request({ url: args2, json: true, followRedirect: false }, function(err, res, body) {
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
                value: body.description
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
    } else if (content.match(/\btime\b/g)) {
      var date = new Date();
      if (content.match(/\bcurrent\b/g)) {
        if (match = content.match(regex)) {
          if (tzOffset[match[0]]) offset = tzOffset[match[0]];
          else offset = parseInt(match[0].slice(3));
          if (offset < -11 || offset > 12) {
            message.send("Senpai, that timezone is invalid!", "serious");
          } else {
            offset = offset * 60 * 60 * 1000;
            date.setTime( date.getTime() + offset );
            message.send("Senpai, the current time in " + match[0].toUpperCase() + " is " + date.toUTCString().slice(0, -3));
          }
        } else {
          message.send("Senpai, the current local time is " + date.toLocaleString());
        }
      } else if (match = content.match(/\d\d:\d\d/g)) {
        match = match[0];
        h = parseInt(match.slice(0, 2));
        m = match.slice(3);
        if (tz = content.match(regex)) {
          tz = tz[0];
          if (tzOffset[tz]) offset = tzOffset[tz];
          else offset = parseInt(tz.slice(3));
          if (offset < -11 || offset > 12) {
            message.send("Senpai, that timezone is invalid!", "serious");
          } else {
            if (content.startsWith("what") || content.startsWith("wat")) {
              if (content.indexOf(tz) < content.indexOf('local')) {
                h = offset - 7 + h;
              } else {
                h = h - offset + 7;
              }
            } else {
              if (content.indexOf(tz) > content.indexOf('local')) {
                h = offset - 7 + h;
              } else {
                h = h - offset + 7;
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
      }
    }
    if (!reply) {
      message.send("Sorry senpai, I don't understand what you're saying at all...");
    }
  }
});
bot.on('ready', () => { console.log("Mashu is ready, senpai!"); });
bot.login(token).catch(console.log);