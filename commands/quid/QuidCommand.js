const { Command } = require('discord.js-commando');
const axios = require('axios')
const { morphoPossibility } = require('../../resources/magistratus.js');
const { randomFoundedResearchLines } = require('../../resources/randomFoundedResearchLines.js');

const paginationEmbed = require('discord.js-pagination');
const { MessageEmbed } = require('discord.js');


module.exports = class QuidCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'quid',
            aliases: ['qvid'],
            group: 'quid',
            memberName: 'quid',
            description: 'Searching latin word informations for user',
            throttling: {
                usages: 3,
                duration: 5, //seconds
            },
            args: [
                {
                    key: 'lemma',
                    prompt: 'The latin word that you need informations',
                    type: 'string',
                    default: 'rosa',
                },
            ],
        });
    }
    
     run(msg, { lemma }) {

            const API = axios.get('https://latinwordnet.exeter.ac.uk/api/lemmas/' + lemma + '/')
                
                .then(async(result) => {
                const globalElement = result.data['results'];
                var indexCounter = globalElement.length;
                if (!indexCounter){return msg.say('No match found !');}
                
                const FoundedResearchLines = randomFoundedResearchLines[Math.floor(Math.random() * randomFoundedResearchLines.length)];
                msg.say("<@" + msg.author.id + ">" + FoundedResearchLines);

                const posPossibility = { 'v': 'verb', 'n': 'noun', 'a': 'adjective', 'r': 'adverb', '': 'undefined', ' ': 'undefined' };
                   
                
                for (let i = 0; i < indexCounter; ++i){
                      let elementIndex = globalElement[i];
                        let IPA = elementIndex['phonological_transcription'];
                        IPA = IPA[0]['ipa'];
                        let lemma = elementIndex['lemma'];
                        let pos = elementIndex['pos'];
                        pos = posPossibility[pos];
                        let morpho = elementIndex['morpho'];     
                        morpho = morphoPossibility[morpho];
                        let prosody = elementIndex['prosody'];
                        let principalParts = elementIndex['principal_parts'];
                        let indexFinder = ('  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ '+ '**' + (i + 1) + '**'+' ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Table Of Index ' + '\n\n' +
                        'International Phon. Alpha.  :  ' + IPA  + '\n\n' +
                        'Lemma : '      + lemma + '\n' +
                        'Function : '    + pos + '\n' +
                        'Morpho : '       + morpho + '\n' +
                        'Prosody : '      + prosody + '\n' +
                        'Radical : '      + principalParts + '\n');
                    
                        const embed1 = new MessageEmbed();
                        const embed2 = new MessageEmbed();

                        var pages = [

                            embed1,
                            embed2,
                        ];

                    // await msg.say({ embed: { color: 0x9d0c0c, description: indexFinder }});
                    // await msg.say({ embed: { color: 0x9d0c0c, description: indexFinder }});

                }


                paginationEmbed(msg,pages);

              



            })
            .catch((err) => {
                console.error('ERR', err);
            })
    }
};
