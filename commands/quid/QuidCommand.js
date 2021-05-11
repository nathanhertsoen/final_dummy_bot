const { Command } = require('discord.js-commando');
const axios = require('axios')
const { morphoPossibility } = require('../../resources/magistratus.js');
const { randomFoundedResearchLines } = require('../../resources/randomFoundedResearchLines.js');


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
                    for (var elementID = 0; elementID < indexCounter; ++elementID){
                        var elementIndex = globalElement[elementID];
                        var IPA = elementIndex['phonological_transcription'];
                        var IPA = IPA[0]['ipa'];
                        var lemma = elementIndex['lemma'];

                        var pos = elementIndex['pos'];
                        var pos = posPossibility[pos];

                        var morpho = elementIndex['morpho'];     
                        var morpho = morphoPossibility[morpho];

                        var prosody = elementIndex['prosody'];
                        var principalParts = elementIndex['principal_parts'];

                    var indexFinder = ('  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ '+ '**' + (elementID + 1) + '**'+' ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Table Of Index ' + '\n\n' +

                        'International Phon. Alpha.  :  ' + IPA  + '\n\n' +

                        'Lemma : '      + lemma + '\n' +
                        'Function : '    + pos + '\n' +
                        'Morpho : '       + morpho + '\n' +
                        'Prosody : '      + prosody + '\n' +
                        'Radical : '      + principalParts + '\n');
                    
                    await msg.say({ embed: { color: 0x9d0c0c, description: indexFinder }});
                   
                }
            })
            .catch((err) => {
                console.error('ERR', err);
            })
    }
};
