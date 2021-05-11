const { Command } = require('discord.js-commando');

module.exports = class LoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sum',
            group: 'sum',
            memberName: 'sum',
            description: 'Summoning friends.',
            throttling: {
                usages: 2,
                duration: 10,
            },
        });
    }
    async run(message) {

        // const messages = [];
        // const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const user = 320556948380450818;
        const msg = user.toString() + "has been muted";
        await message.say(msg);
       
    }
};