module.exports = {
  exec: (client, message, content, args) => {
    temp = {
      description: "Sure " + client.name + "-senpai, here is my stat:",
      fields: [
        {
          name: "Bot uptime",
          value: Math.floor(client.bot.uptime / 864000000) + 'd : ' + (Math.floor(client.bot.uptime / 3600000) % 24) + 'h : ' + (Math.floor(client.bot.uptime / 60000) % 60) + 'm : ' + (Math.floor(client.bot.uptime / 1000) % 60) + 's',
          inline: true
        },
        {
          name: "Process uptime",
          value: Math.floor(process.uptime() / 864000) + 'd : ' + (Math.floor(process.uptime() / 3600) % 24) + 'h : ' + (Math.floor(process.uptime() / 60) % 60) + 'm : ' + (Math.floor(process.uptime()) % 60) + 's',
          inline: true
        },
        {
          name: "Total Servers",
          value: client.bot.guilds.size,
          inline: true
        },
        {
          name: "Total Channels",
          value: client.bot.channels.size,
          inline: true
        },
        {
          name: "Total Cached Users",
          value: client.bot.users.size,
          inline: true
        },
        {
          name: "Memory Usage",
          value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB',
          inline: true
        }
      ],
      color: 0x683b62
    };
    if (Math.random() > 0.5) temp.thumbnail = { url: client.emote["default"] };
    else temp.thumbnail = { url: client.emote["smile"] };
    message.channel.sendMessage('', { embed: temp });
    client.reply = true;
  }
}