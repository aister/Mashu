# MashuBot
MashuBot is an open source discord bot made in Node.js. This bot was made as an experiment in making a pseudo-AI bot which will be able to detect what the user want and reply with the appropriate content.

For bot support, or suggestion, please join [Our Discord server](http://discord.gg/VcYEefZ)

## Command List
MashuBot's prefix is `mashu,` (case-insensitive) and should be included at the start of every messages if you want mashu to respond. Some other "commands" which doesn't use the prefixes will be listed under [Special Commands](#special).

All the commands are case-insensitive

### You there?
Pretty much a ping, checking if the bot is still responding normally.
```
Mashu, are you there?
```

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

### Servant Info
Mashu will search for a certain information about a servant. The name of the servant should be put inside the quotation marks. In case you want to search by ID, put `id:` in front of the id of the servant (and put the whole thing in quotation marks!)
```
Mashu, can you search for the servant info of "Okita" please?
Mashu, what is the servant info for "id:001.5"?
```

### Invite
This command will give you the invite link that you can use to invite the bot to your server

### Time
This will have 2 modes:
- Current time: the message should have **current** in the content. It will give you the current local time, or the current local time of the provided timezone.
- Time conversion: the message shouldn't have **current** in the content, but provide a hh:mm format time instead. This will convert time from a timezone to local, or local to timezone. From timezone to timezone isn't yet supported
- **NOTE:** Currently we only support PST / PDT, EST / EDT, DST and GMT/UTC-type timezone.

## Special Commands
These "commands" doesn't use the prefix, and are put in the bot in order to give the bot some sort of pseudo-personality.
- messages with the content including `thx mashu`, `thanks mashu` or `thank you mashu` will make Mashu say "you're welcome"
- messages with the content including `it's ok, mashu` will make Mashu say "I'll try better next time"
- messages with the content including `right, mashu` will make Mashu agreeing with you
- messages with the content including `good job mashu`, `gj mashu` or `nice, mashu` will make Mashu blush and say thanks