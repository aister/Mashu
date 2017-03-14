request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    if (args) {
      message.channel.startTyping();
      message.send("Surely, senpai, please wait a moment");
      request({ url: "https://raw.githubusercontent.com/aister/nobuDB/master/fgo_main.json", json: true, followRedirect: false }, function(err, res, body) {
        let result = "";
        if (args.startsWith('id:')) result = {item: body[args.slice(3)]};
        else {
          for (let item in body) {
            if (body[item].name.toLowerCase().includes(args.toLowerCase())) {
              if (result) result.other.push(body[item].id);
              else result = {item: body[item], other: []};
            }
          }
        }
        message.channel.stopTyping();
        if (result) {
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
              value: body.rarity,
              inline: true
            },
            {
              name: "Alignment",
              value: body.alignment,
              inline: true
            },
            {
              name: "Class",
              value: body.servantClass,
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
              name: "NP",
              value: body.NP
            },
            {
              name: "Description",
              value: body.desc
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
              value: result.other.join(' | ') + "\n\nUse `id:<servantID>` for precise search"
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
          console.log(servant);
          message.channel.sendMessage('', { embed: servant });
        } else message.send("I'm sorry, senpai, I couldn't find anything at all")
      });
    }
  }
}