module.exports = {
  exec: (client, message, content, args) => {
    if (message.author.id == "184369428002111488") {
      message.send("Surely senpai, I will reset the code in a moment!");
      client.load(client, function() {
        message.send("I've reset the code for you senpai!");
      });
    }
  }
}