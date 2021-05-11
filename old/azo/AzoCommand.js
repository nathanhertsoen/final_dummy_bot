const { Command } = require('discord.js-commando');

module.exports = class AzoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'azo',
            group: 'azo',
            memberName: 'azo',
            description: 'azo.',
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