translate = require('google-translate-api');
module.exports = {
  exec: (client, message, content, args) => {
    message.send("I'll try my best to translate it for you, senpai");
    translate(args2, {to: 'en'}).then(res => {
      message.send("Done! Here's the translation:```\n" + res.text + '```');
    });
  }
}