exports.func = (user, obj) => {
  embed = {
    title: "FGO Profile for " + user.username,
    fields: [
      {
        name: "IGN",
        value: obj.name || "Not Provided"
      },
      {
        name: "Friend ID",
        value: obj.id || "Not Provided"
      }
    ],
    description: "\u200b",
    thumbnail: { url: user.displayAvatarURL }
  }
  if (obj.support) embed.image = { url: obj.support }
  return embed;
}
exports.exec = (client, message, content, args) => {
  message.send("Surely senpai, please wait a moment");
  func = this.func;
  if (args) {

  }
  client.db.get('fgoProfile_' + message.author.id, function (err, result) {
    if (args || message.attachments.first()) {
      if (result) obj = JSON.parse(result);
      else obj = {};
      args.replace(/ ?\| ?/g, '|').split('|').forEach(item => {
        item = item.trim();
        if (item.startsWith('name:')) obj.name = item.slice(5).trim();
        else if (item.startsWith('id:')) obj.id = item.slice(3).trim();
      });
      if (img = message.attachments.first()) {
        obj.support = img.url;
      }
      result = JSON.stringify(obj);
      client.db.set('fgoProfile_' + message.author.id, result, function() {
        message.channel.sendMessage('Profile saved successfully', {embed: client.commands["my profile"].func(message.author, obj)});
      });
    } else {
      if (result) {
        obj = JSON.parse(result);
        message.channel.sendMessage('', {embed: func(message.author, obj)});
      } else {
        message.channel.sendMessage("Profile not found senpai, attach an argument to create one");
      }
    }
  })
}