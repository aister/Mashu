request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    var tzOffset = {"pst": -8,"pdt": -7,"est": -5,"edt": -4,"jst": 9,"dst": 1}
    var regex = [];
    var timer = {};
    for (var item in tzOffset) {
      regex.push(item);
    }
    regex = new RegExp(regex.join("|") + "|gmt[+-]\\d\\d?|utc[+-]\\d\\d?", "g");
    var date = new Date();
    localTZ = Math.floor(date.getTimezoneOffset() / 60) * -1;
    if (match = content.match(/\d\d:\d\d/g)) {
      match = match[0];
      h = parseInt(match.slice(0, 2));
      m = match.slice(3);
      if (tz = content.match(regex)) {
        if (tz.length == 1) {
          tz = tz[0];
          if (tzOffset[tz]) offset = tzOffset[tz];
          else offset = parseInt(tz.slice(3));
          if (offset < -11 || offset > 12) {
            message.send("senpai, that timezone is invalid!", "serious");
          } else {
            if (!content.includes('local')) {
                h = localTZ - offset + h;
                info = 'local time';
            } else if (content.startsWith("what") || content.startsWith("wat")) {
              if (content.indexOf(tz) < content.indexOf('local')) {
                h = offset - localTZ + h;
                info = 'local time';
              } else {
                h = h - offset + localTZ;
                info = tz.toUpperCase();
              }
            } else {
              if (content.indexOf(tz) > content.indexOf('local')) {
                h = offset - localTZ + h;
                info = 'local time';
              } else {
                h = h - offset + localTZ;
                info = tz.toUpperCase();
              }
            }
          }
        } else {
          offset = [];
          if (tzOffset[tz[0]]) offset[0] = tzOffset[tz[0]];
          else offset[0] = parseInt(tz[0].slice(3));
          if (tzOffset[tz[1]]) offset[1] = tzOffset[tz[1]];
          else offset[1] = parseInt(tz[1].slice(3));
          if (Math.min(offset[0], offset[1]) < -11 || Math.max(offset[0], offset[1]) > 12)
            message.send('senpai, that timezone is invalid!', "serious");
          else {
            if (content.startsWith("what") || content.startsWith("wat")) {
              if (content.indexOf(tz[0]) < content.indexOf(match)) {
                h = offset[0] - offset[1] + h;
                info = tz[0].toUpperCase();
              } else {
                h = offset[1] - offset[0] + h;
                info = tz[1].toUpperCase();
              }
            } else {
              h = offset[1] - offset[0] + h;
              info = tz[1].toUpperCase();
            }
          }
          //what is the time in GMT+7 if JST is 00:00 => tz[0] < match && startsWith(what) => ask for tz[0] => h = 7 - 9 + h
          //if JST is 00:00, what is the time in GMT+7 => tz[0] < match && !startsWith(what) => ask for tz[1] => h = 7 - 9 + h
          //what is the time of 00:00 JST in GMT+7? => tz[0] > match && startsWith(what) => ask for tz[1] => h = 7 - 9 + h
        }
        if (h >= 24) {
          h -= 24;
          info += " in the next day";
        } else if (h < 0) {
          h += 24;
          info += " in the previous day";
        } else {
          info += " in the same day";
        }
        if (h < 10) h = "0" + h;
        message.send("It will be " + h + ":" + m + " at " + info + ", senpai.");
      }
    } else {
      if (match = content.match(regex)) {
        if (tzOffset[match[0]]) offset = tzOffset[match[0]];
        else offset = parseInt(match[0].slice(3));
        if (offset < -11 || offset > 12) {
          message.send("senpai, that timezone is invalid!", "serious");
        } else {
          offset = offset * 60 * 60 * 1000;
          date.setTime( date.getTime() + offset );
          message.send("senpai, the current time in " + match[0].toUpperCase() + " is " + date.toUTCString().slice(0, -3));
        }
      } else {
        message.send("senpai, the current local time is " + date.toLocaleString());
      }
    }
  }
}