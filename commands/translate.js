translate = require('google-translate-api');
module.exports = {
  exec: (client, message, content, args) => {
    message.send("I'll try my best to translate it for you, senpai");
    translate(args, {to: 'en'}).then(res => {
      message.send("Done! Here's the translation:```\n" + res.text + '```');
    }).catch(console.log);
  }
}