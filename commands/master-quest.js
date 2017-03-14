var request = require('request');
exports.exec = (client, message, content, args) => {
  message.send("Surely senpai, please wait a moment");
  request({
    url: 'https://raw.githubusercontent.com/aister/nobuDB/master/master.json',
    json: true
  }, function(err, res, body) {
    message.send("Here is the Master mission for this week, senpai:\n\n" + body.master);
  });
}