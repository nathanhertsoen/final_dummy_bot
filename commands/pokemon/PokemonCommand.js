const { Command } = require('discord.js-commando');
const { prefix } = require('../../config/config.json');
const axios = require('axios');


module.exports = class QuidCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'pokemon',
            group: 'pokemon',
            memberName: 'pokemon',
            description: 'Searching pokemon for user',
            throttling: {
                usages: 3,
                duration: 5, //seconds
            },
            args: [
                {
                    key: 'pokemon',
                    prompt: 'pokemon informations',
                    type: 'string',
                },
            ],
        });
    }
    run(message, {pokemon}){
       
         axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/')

        
                .then((result) => {
                    var globalElement = result.data['results'];
                    globalElement.forEach(element => element);

                    const _msgs = JSON.stringify(globalElement, null, 2);
                    // console.log(_msgs);
                    message.say('```json\n' + _msgs + '```\n');
                })
                .catch((err) => {
                    console.error('ERR', err);
                })
    }
}