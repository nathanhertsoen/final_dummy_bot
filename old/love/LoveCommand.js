const { Command } = require('discord.js-commando');

module.exports = class LoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mordhau',
            group: 'mordhau',
            memberName: 'mordhau',
            description: 'Some maurdhau\s lines',
            throttling: {
                usages: 2,
                duration: 10,
            },
        });
    }
    async run(message) {

        const messages = ["The master is good with me.", "I don't think so.", "Salutations good sir.", "You have my gratitude.", "Yes, yes, pleased to meet you I'm sure.", "You good sir!", "Never before I have seen such SKILL!", "Dodge this you bastard!","To victoooory!"]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        // message.say(randomMessage);

        // var banane = await message.say({ embed: { color: 0x80ff00, description: 'hello !' } });
        
        var msg = await message.say({ embed: { color: 0x9d0c0c, description: 'compris !'  } });
        msg.edit({ embed: { color: 0x9d0c0c, description: randomMessage  } });


        


    }
};