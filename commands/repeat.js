module.exports = {
  exec: (client, message, content, args) => {
    if (args) message.send(args);
  }
}