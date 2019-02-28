/**
 * @file 
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */
const { name } = require('../assets/lol-champs.json');
const Discord = require('discord.js');
const randomColor = require('randomcolor');

module.exports = {
	name: 'rchamp',
    description: 'Randomly picks a League champion',
    /**
     * Random champion selects a champion from the 
     * 'League of Legends' cast to display at random.
     * After the name is selected the coresponding 
     * picture is found and then both are displayed in
     * an embed.
     * 
     * @param {Message} msg 
     * @param {Array} args 
     */
	execute(msg, args) {
        // 143 Champs as of 2/11/19
        var champNo = Math.floor((Math.random() * 143) + 1);
        var imgFile = `${name[champNo]}_Splash_Tile_0.jpg`;

        const exampleEmbed = new Discord.RichEmbed()
        .setColor(`${randomColor()}`)
        .setTitle(`${name[champNo]}`)
        .attachFiles([`./assets/lol-icons/${imgFile}`, `./assets/purple_heart.png`])
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`Feed as ${name[champNo]}`)
        .setImage(`attachment://${imgFile}`)
        .setTimestamp()
        .setFooter('Pentas not guaranteed', `attachment://purple_heart.png`);

        msg.channel.send(exampleEmbed);

	},
};