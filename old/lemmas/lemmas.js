const { Command } = require('discord.js-commando');

const api = "https://latinwordnet.exeter.ac.uk/api/lemmas/";
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    snekfetch.get(api).then(console.log);
}

module.exports.help = {
    name: 'json'
}