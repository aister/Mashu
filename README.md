# MashuBot
MashuBot is an open source discord bot made in Node.js. This bot was made as an experiment in making a pseudo-AI bot which will be able to detect what the user want and reply with the appropriate content.

For bot support, or suggestion, please join [Our Discord server](http://discord.gg/VcYEefZ)

Thanks to Paiko Shi for the emotion edits!

## Command List
MashuBot's prefix is `mashu,` (case-insensitive) and should be included at the start of every messages if you want mashu to respond. Some other "commands" which doesn't use the prefixes will be listed under [Special Commands](#special).

All the commands are case-insensitive

- [You there?](#you-there)
- [Selfie](#selfie)
- [Timer](#timer)
- [Search](#search)
- [Repeat](#repeat)
- [My Profile](#my-profile)
- [Servant Info](#servant-info)
- [Invite](#invite)
- [Daily Quest](#daily-quest)
- [Master Quest](#master-quest)
- [Time](#time)
- [Twitter](#twitter)
- [Translate](#translate)
- [Stat](#stat)


### You there?
Pretty much a ping, checking if the bot is still responding normally.
```
Mashu, are you there?
```

### Selfie
This command will search on safebooru a picture of our beloved Mashu. Because no one has enough mashu pics, amiright?

### Timer
This command will **start** or **stop** the timer for you. Just include in your message (along with the prefix and the command name) the word *start* to start the timer, or *stop* to stop it. For example:
```
Mashu, can you start the timer for me please?
Mashu, I'm done! Stop the timer!
```

### Search
Mashu will search on google for you. The search terms should be wrapped inside quotation marks.
```
Mashu, can you search "Aister Github"? I lost the link
```

### Repeat
Mashu will repeat after you. She's a nice girl, isn't she? Don't force her to say lewd things tho. The sentence you want her to repeat should be put inside quotation marks.
```
Mashu, repeat after me: "Aister is my one and only Master"
```

### My Profile
Mashu will retrieve your FGO profile for you. If you include a photo and / or an argument (wrapped in quotation mark) in the following format, Mashu will edit the profile for you.

**Argument format:**
```
name: <Your IGN> | id: <Your friend ID>
```
**Usage Example:**
```
mashu, give me my profile please?
mashu, edit my profile with "name: AisterSoPro | id: 123,456,789" please?
```

### Servant Info
Mashu will search for a certain information about a servant. The name of the servant should be put inside the quotation marks. In case you want to search by ID, put `id:` in front of the id of the servant (and put the whole thing in quotation marks!)
```
Mashu, can you search for the servant info of "Okita" please?
Mashu, what is the servant info for "id:001.5"?
```

### Invite
This command will give you the invite link that you can use to invite the bot to your server

### Daily Quest
This command will give you the daily quest info of the current date in Japan

### Master Quest
This command will give you the master quest info. I will try to update the data for this as soon as the info comes out.

### Time
This will have 2 modes:
- Current time: the message shouldn't have any hh:mm time format in the content. It will give you the current local time, or the current time of the provided timezone.
- Time conversion: the message should provide a hh:mm time format in the content. This will convert time from a timezone to local, or local to timezone, or from timezone to timezone.
- **NOTE:** Currently we only support PST / PDT, EST / EDT, DST and GMT/UTC-type timezone.

### Twitter
Grab the updates from FGO English Twitter. At the moment, this will have 2 modes:
- Get pinned post: the message should have **pinned** or **pin** in the content. The bot will give you the link to the pinned post.
- Get latest post: the message shouldn't have **pinned** or **pin** in the content. The bot will get the latest post, ignoring the pinned post if there's any.

### Translate
Translate from any language (that Google Translate supported) into English, the part that needs translating should be put inside the quotation marks.

### Stat
Give a overview of the stat of the bot, how much memory it is using, and other stats as well.

## Special Commands
These "commands" doesn't use the prefix, and are put in the bot in order to give the bot some sort of pseudo-personality.
- messages with the content including `thx mashu`, `thanks mashu` or `thank you mashu` will make Mashu say "you're welcome"
- messages with the content including `it's ok, mashu` will make Mashu say "I'll try better next time"
- messages with the content including `right, mashu` will make Mashu agreeing with you
- messages with the content including `good job mashu`, `gj mashu` or `nice, mashu` will make Mashu blush and say thanks

## Other
Messages that started with the prefix, but didn't fall into any categories above, will also be replied with an AI-ish response. However as the bot is still new and there might be errors in the way it detects and inteprets intentions, the replies might not make sense sometimes :P
