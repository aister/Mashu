module.exports = {
  exec: (client, message, content, args) => {
    if (args) message.send("Ganbarou, " + args + "-[s]! You can do it!", "smile")
    else message.send("Ganbarou senpai! You can do it!", "smile");
  }
}
