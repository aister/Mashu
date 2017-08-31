module.exports = {
  exec: (client, message, content, args) => {
    if (args) message.send(args + "-[s] is a bad person!", "serious")
    else message.send("Senpai is a bad person!", "serious");
  }
}
