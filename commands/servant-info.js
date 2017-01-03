request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    if (args) {
      console.log(args);
      if (args.startsWith('id:')) args = "http://aister.site90.com/api.php?mode=servants&c=dataID&query=" + encodeURI(args.slice(3));
      else args = "http://aister.site90.com/api.php?mode=servants&c=name&query=" + encodeURI(args);
      message.channel.startTyping();
      message.send("Surely, senpai, please wait a moment");
      request({ url: args, json: true, followRedirect: false }, function(err, res, result) {
        message.channel.stopTyping();
        if (res.statusCode != 302 && result.item) {
          body = result.item;
          attack = body.attacks.replace(/.{2}/g, function (match) {
            switch (match) {
              case "01": return "Quick, ";
              case "02": return "Arts, ";
              case "03": return "Buster, ";
            }
          }).slice(0, -2);
          field = [
            {
              name: "Rarity",
              value: body.rarity
            },
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
            },
            {
              name: 'Note',
              value: (body.note || "none")
            }
          ];
          if (result.other) {
            field[field.length - 1].value += "\n\u200b";
            field.push({
              name: "Other results (in servant ID)",
              value: result.other + "\n\nUse `id:<servantID>` for precise search"
            })
          }
          servant = {
            title: body.name + ' (ID: ' + body.dataID + ')',
            color: 0xff0000,
            description: "\u200b",
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
  }
}