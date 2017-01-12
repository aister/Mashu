var request = require('request');
exports.exec = (client, message, content, args) => {
  request({
    url: 'http://aister.site90.com/api.php?mode=others&id=1',
    json: true
  }, function(err, res, body) {
    if (body.item) message.send("Here is the Master mission for this week, senpai:\n\n" + body.item[0].value);
    else message.send('Some error occured senpai, please try again later');
  });
}