const fs = require('fs');
module.exports = (client, callback) => {
  let commandList = fs.readdirSync('./commands/');
  client.commandRegex = [];
  client.commands = {};

  client.emote = { 
    "default": "http://i.imgur.com/gahpkzl.png", 
    "serious": 
    "http://i.imgur.com/a30T4gX.png", 
    "embarassed": "http://i.imgur.com/Net4Qyq.png", 
    "flustered": "http://i.imgur.com/VEWDYD5.png", 
    "smile": "http://i.imgur.com/lvSSKGX.png" 
  }

  loadTime = Date.now();
  for (i = 0; i < commandList.length; i++) {
    let item = commandList[i];
    if (item.match(/\.js$/)) {
      taken = Date.now() - loadTime;
      loadTime += taken;
      delete require.cache[require.resolve(`./commands/${item}`)];
      client.commands[item.slice(0, -3).replace(/-/g, ' ')] = require(`./commands/${item}`);
      client.commands[item.slice(0, -3).replace(/-/g, ' ')].count = 0;
      client.commandRegex.push(`\\b${item.slice(0, -3).replace(/-/g, ' ')}\\b`);
      console.log(`Command ${item.slice(0, -3)} loaded. Took ${taken}ms`);
    }
  }
  client.commandRegex = new RegExp(client.commandRegex.join('|'));
  callback();
}