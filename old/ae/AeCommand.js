const { Command } = require('discord.js-commando');
const { prefix } = require('../../config/config.json');
const axios = require('axios');
const { TextBasedChannel } = require('discord.js');

module.exports = class AeCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'ae',
            group: 'ae',
            memberName: 'ae',
            description: 'Hahahae',
            args: [
                {
                    key: 'lemma',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string',
                },
                {
                    key: 'pos',
                    prompt: 'What is this other useless thing?',
                    type: 'string',
                    default: '',
                    validate: text => text.length < 2, oneOf: ['v', 'n']
                    
                },  
            ],
        });
    }
    

    


        run(msg, { lemma }, { pos }){
            if(!pos){
                const API = axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
                    .then((result) => {
                        const globalElement = result.data['results'];
                        globalElement.forEach(element => element);

                        const _message = JSON.stringify(globalElement, null, 2);
                        return msg.say('```json\n' + _message + '\n```');
                    })
                    .catch((err) => {
                        console.error('ERR', err);
                    })
            }
            else{
                const API = axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/' + pos + '/')
                    .then(async (result) => {
                        const globalElement = result.data['results'];
                        globalElement.forEach(element => element);

                        const _message = JSON.stringify(globalElement, null, 2);
                        return msg.say('```json\n' + _message + '\n```');
                    })
                    .catch((err) => {
                        console.error('ERR', err);
                    })
            }

            


          

///////////////////////////////////////

            // const API = axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/' + pos + '/')
            //     .then(async (result) => {
            //         const globalElement = result.data['results'];    
            //         const _message = await jsonProcessing(globalElement);
            //         return msg.say('```json\n' + _message + '\n```');
            //     })
            //     .catch((err) => {
            //         console.error('ERR', err);
            //     })


            // function jsonProcessing(globalElement){
            //     globalElement.forEach(element => element);
            //     const _message = JSON.stringify(globalElement, null, 2);
            //     return _message;
            // }



        //////////////////////////////////////////////////////////
       
        // const API = await axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/'+lemma+'/')
        //     .then(async (result) =>  {
        //     const globalElement = result.data['results'];
        //     const element = await globalElement.forEach(element => element);

        //     const _message = JSON.stringify(globalElement, null, 2);
        //     return msg.say('```json\n' + _message + '\n```');
        //      })
        //     .catch((err) => {
        //         console.error('ERR', err);
        //     })

//////////////////////////////////////////////////////////

        // const message = await msg.say('Hi, I\'m awake!');
        // return message.edit('I want to go to bed.');

        //     axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
        //     .then((result) => {
        //                 var globalElement = result.data['results'];
        //                 globalElement.forEach(element => element);

        //                 const _msgs = JSON.stringify(globalElement, null, 2);
        //                 // console.log(_msgs);
        //                 return message.say('```json\n' + _msgs + '\n```');
        //             })
        //             .catch((err) => {
        //                 console.error('ERR', err);
        //             })





        // async function largeScopeSearch(lemma) {
        //     console.log('lemma : ' + lemma);

        //     return new Promise(resolve => {
        //             axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
        //             .then((result) => {
        //                 var globalElement = result.data['results'];
        //                 globalElement.forEach(element => element);

        //                 const _msgs = JSON.stringify(globalElement, null, 2);
        //                 // console.log(_msgs);
        //                 return message.say('```json\n' + _msgs + '\n```');
        //             })
        //             .catch((err) => {
        //                 console.error('ERR', err);
        //             })
        //     });
        // }
        
        
        // function mediumScopeSearch(){
            
        //     axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/' + pos + '/')
        //         .then((result) => {
        //             var globalElement = result.data['results'];
        //             globalElement.forEach(element => element);

        //             const _msgs = JSON.stringify(globalElement, null, 2);
        //             // console.log(_msgs);
        //             return message.say('```json\n' + _msgs + '\n```');
        //         })
        //         .catch((err) => {
        //             console.error('ERR', err);
        //         })

        // }

        // console.log(text);
        // console.log('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/' + pos + '/');
        // return message.reply('https://latinwordnet.exeter.ac.uk/api/lemmas/'+text+'/');
        // axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/furor')
    }
};
