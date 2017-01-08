let timer = {};
module.exports = {
  exec: (client, message, content, args) => {
    if (content.match(/\bstart\b/g)) {
      timer[message.author.id] = Date.now();
      message.send("Roger! The timer has started! Good luck, senpai!");
    } else if (content.match(/\bstop\b/g)) {
      if (timer[message.author.id]) {
        timer[message.author.id] = Date.now() - timer[message.author.id];
        h = Math.floor(timer[message.author.id] / 3600000);
        if (h < 10) h = "0" + h;
        timer[message.author.id] = timer[message.author.id] % 3600000;
        m = Math.floor(timer[message.author.id] / 60000);
        if (m < 10) m = "0" + m;
        timer[message.author.id] = timer[message.author.id] % 60000;
        s = Math.floor(timer[message.author.id] / 1000);
        if (s < 10) s = "0" + s;
        timer[message.author.id] = timer[message.author.id] % 1000;
        if (timer[message.author.id] < 10) timer[message.author.id] = "0" + timer[message.author.id];
        message.send("The timer has stopped! The screen says " + h + ":" + m + ":" + s + "." + timer[message.author.id] + ", senpai!");
        delete timer[message.author.id];
      }
    }
  }
}