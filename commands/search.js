request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    if (args) {
      message.send("Surely, senpai, please wait a moment");
      reply = true;
      message.channel.startTyping();
      request('https://www.google.com/search?safe=active&q=' + encodeURI(args), function(err, res, body) {
        if (err) console.log(err);
        else {
          if (body.indexOf('/url?q=') > -1) {
            body = body.slice(body.indexOf('/url?q=') + 7);
            body = body.slice(0, body.indexOf('&'));
            body = decodeURIComponent(body);
            message.send("senpai, I found this website. I hope this is what you are looking for.\n" + body);
          } else message.send("Sorry senpai, I couldn't find anything");
        }
        message.channel.stopTyping();
      });
    }
  }
}