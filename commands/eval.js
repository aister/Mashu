util = require('util');
module.exports = {
  exec: (client, message, content, args) => {
    if (message.author.id == "184369428002111488") {
      if (args) {
        log = (content) => { message.send(content); };
        try {
          args = eval(args);
          if (typeof args == "object") args = util.inspect(args, {depth: 0});
          reg = new RegExp(client.token.replace(/\./g, "\\."), 'gi');
          if (typeof args == "string") args = args.replace(reg, 'Removed');
          message.send("Of course senpai, here it is:\n```js\n" + args + "\n```");
        } catch(err) {
          message.send("Senpai, there's an error in your code: \n```js\n" + err + "\n```", "serious");
        }
      } else {
        message.send("Senpai, how do you expect me to eval when there's no code?", "serious");
      }
    }
  }
}