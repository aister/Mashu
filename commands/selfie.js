request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    message.send("Surely, senpai, please wait a moment");
    request({
      url: 'https://safebooru.donmai.us/posts.json?random=true&limit=1&tags=shielder_%28fate%2Fgrand_order%29',
      json: true
    }, function (err, temp, body) {
      if (!err && body.length > 0 && body[0].file_url) {
        selfie = {
          image: { url: "https://safebooru.donmai.us/" + body[0].file_url },
          description: "Here you go senpai",
          thumbnail: { url: client.emote.embarassed },
          color: 0xff0000
        }
        message.channel.sendMessage("", { embed: selfie });
      } else {
        message.send("I'm sorry senpai, the camera is broken");
        console.log(err);
        console.log(body);
      }
    });
  }
}