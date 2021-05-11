const { Command } = require('discord.js-commando');
const { prefix } = require('../../config/config.json');
const axios = require('axios');
const { TextBasedChannel, ReactionUserManager } = require('discord.js');

const { morphoPossibility } = require('./magistratus.js');


module.exports = class DefCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'fed',
            aliases: ['fed'],
            group: 'fed',
            memberName: 'fed',
            description: 'Searching Terms For Users',
            throttling: {
                usages: 3,
                duration: 5, //seconds
            },
            args: [
                {
                    key: 'word',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string',
                },
            ],
        });
    }
    
    run(msg, { word }) {
        
            const API = axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + word + '/synsets')
                
            .then((result) => {
                const globalElement = result.data['results'];
                if (globalElement.length >= 2000) {return msg.say('Response is too length !');}

                globalElement.length > 2000 ?  msg.say('Response is too length !') : msg.say('Ok!');
                // globalElement.forEach(array => console.log(array['word']));
                
                // DEBUG
                    // globalElement.forEach(element => element);
                    // const _message = JSON.stringify(globalElement, null, 2);
                    // return msg.say('```json\n' + _message +  '\n```');
                //////DEBUG PHONETICAL
                    // var phonetic = globalElement[0]['phonological_transcription'];
                    // var trans = phonetic[0]['ipa'];
                //////////////////////


               var elementCounter = globalElement.length;
                // console.log(globalElement.length);return;
                if (!elementCounter) {return msg.say('No match found !');}
                if (elementCounter>1) {return msg.say('To many results !');}


                


                const posPossibility = { 'v': '𝐯𝐞𝐫𝐛', 'n': '𝐧𝐨𝐮𝐧', 'a': '𝐚𝐝𝐣𝐞𝐜𝐭𝐢𝐯𝐞', 'r': '𝐚𝐝𝐯𝐞𝐫𝐛', '': 'undefined', ' ': '𝚞𝚗𝚍𝚎𝚏𝚒𝚗𝚎𝚍' };
                console.log('elementCounter : ' + globalElement.length);
                for (var i = 0 ; i < elementCounter ; ++i){        
                   
                    // console.log(i);
                    var elementIndex = globalElement[i];
                    
                    // var IPA = phonologicalTranscriptionArray['ipa'];
                    // console.log(IPA[i], ' : ', typeof IPA[i]['ipa'] );
                    
                   
                    
                    // console.log('literalCounter : ' + literalCounter);




                    // var lemma = elementIndex['lemma'];
                    // var pos = elementIndex['pos'];
                    // var pos = posPossibility[pos];
                    var morpho = elementIndex['morpho'];
                    var morpho = morphoPossibility[morpho];
                    // var prosody = elementIndex['prosody'];

                    
                   
                    var table =+ msg.say('```diff\n' + '- 𝓘𝓃𝒹𝑒𝓍 𝓣𝒶𝒷𝓁𝑒𝓈 : ' + (i+1) + '\n' +


                        // ' - Lemma     =>  '  + '[ ' + lemma          + ' ]'  + '\n' +
                        // ' - Function  =>  '  + '[ ' + pos            + ' ]'  + '\n' +
                        ' - Morpho    =>  '  + '[ ' + morpho         + ' ]'  + '\n' +
                        // ' - Prosody   =>  '  + '[ ' + prosody        + ' ]'  + '\n' +
                        '\n```');
                        

                        var synsets = elementIndex['synsets'];
                        var literal = synsets['literal'];



                        const literalCounter = literal.length;
                        for(var i = 0 ; i < literalCounter ; ++i){
                           
                            
                            var literalIndexArray = literal[i];
                            // console.log(literalIndexArray);
    
                            var language = literalIndexArray['language']['abbrev'];
                            // console.log(language);
    
                            var pos = literalIndexArray['pos'];
                            var pos = posPossibility[pos];
                            
                            var defintion = literalIndexArray['gloss'];
                            var semfield = literalIndexArray['semfield'];

                            table += msg.say('```diff\n' + '- 𝓓𝑒𝒻𝒾𝓃𝒾𝓉𝒾𝑜𝓃 𝓣𝒶𝒷𝓁𝑒𝓈 : ' + [i+1] + '\n' +
                            '_______________________' + '\n' + '\n' +
                            
                            ' - Language   =>  '  + '[ ' + language        + ' ]'  + '\n' +
                            ' - Function  =>  '  + '[ ' + pos            + ' ]'  + '\n' +
                            ' - Definition    =>  '  + '[ ' + defintion         + ' ]'  + '\n' +
                            
                            '\n```');
    
                            const semfieldCounter = semfield.length;
                            for(var i = 0 ; i < semfieldCounter ; ++i){
                                // console.log(semfieldCounter);return;
    
                                var semfieldIndexArray = semfield[i];
                                var semfieldDefintion = semfieldIndexArray['english'];
    
                                // console.log(semfieldDefintion);return;
                                
                                table += msg.say('```diff\n' +
                                    (i + 1) + ' => ' + '[ ' + semfieldDefintion + ' ]' + 
                                '\n```');

                                // table += msg.say({ embed: { color: 0x9d0c0c, description: 'hello !' } });

                               
                            }
                           
    
                        }
                    var superTable = (
                        table
                        );
                        


                    // msg.say('```md\n' + '*' + 'Index Number : ' + (i + 1) + '*'+ '\n' +
                    // '_______________________' + '\n' + '\n' +
                    // 'lemma - ' +  lemma +'\n'+
                    // 'function - : ' + pos + '\n' +
                    // 'morpho : ' + morpho + '\n' +
                    // 'prosody : ' + prosody + '\n' +
                    // 'principal(s) part(s) : ' + principal_parts +
                    // '\n```');
                }

                return superTable;
                // console.log('terminé');return;
                // const lemma = globalElement[0]['lemma'];
                

                // console.log(typeof globalElement); return;
                // globalElement.forEach(element => element);
                // console.log(globalElement); return;

                // const _message = JSON.stringify(globalElement, null, 2);
                // return msg.say('```json\n' + _message + '\n```');
            })

            .catch((err) => {
                console.error('ERR', err);
            })

    ////////////////////////////////////////////////////////////////////////////////////

    // run = async (message, {pos, lemma}) => {
    //     pos ? message.say(mediumScopeSearch()) : message.say(largeScopeSearch(lemma));
        
    //      async function largeScopeSearch(lemma) {
    //         if(lemma){
    //                 const promesse = new Promise((resolve, reject )=> {
    //                     axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
    //                         .then((result) => {
    //                             var globalElement = result.data['results'];
    //                             globalElement.forEach(element => element);

    //                             const _msgs = JSON.stringify(globalElement, null, 2);
    //                             // console.log(_msgs);
    //                             return message.say('```json\n' + _msgs + '\n```');
    //                         })
    //                         .catch((err) => {
    //                             console.error('ERR', err);
    //                         })
    //                 });
    //         }
            
    //     }


        ////////////////////////////////////////////////////////////////////////////////////

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
        
        ////////////////////////////////////////////////////////////////////////////////////
        
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
