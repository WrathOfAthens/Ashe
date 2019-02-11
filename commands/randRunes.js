/**
 * @file 
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */
const {tree, keystones, slots} = require('../assets/lol-runes.json');
const Discord = require('discord.js');

module.exports = {
	name: 'rrunes',
    description: 'Randomly generates a rune page.',
    /**
     * Random runes generates a random 'rune page' as seen
     * from League of Legends. Two trees are to be randomly selected
     * so that they are not the same. Once these two are selected
     * the function randomly chooses the `keystone` and slots so
     * that the first tree has three and the second has two.
     * The names of each rune and tree are then pulled from a JSON file
     * and displayed in an embed.
     * 
     * @param {Message} msg 
     * @param {Array} args 
     */
	execute(msg, args) {
        var firstTree = Math.floor((Math.random() * 5));
        var secondTree = Math.floor((Math.random() * 5));
        while (firstTree == secondTree) {
            secondTree = Math.floor((Math.random() * 5));
        }
        if (firstTree == 'Domination' || firstTree == 'Precision') {
            var keystone = Math.floor((Math.random() * 4));
        } else {
            var keystone = Math.floor((Math.random() * 3));
        }
        var slotOne = Math.floor((Math.random() * 3));
        var slotTwo = Math.floor((Math.random() * 3) + 3);
        if (firstTree == 'Domination') {
            var slotThree = Math.floor((Math.random() * 4) + 6);
        } else {
            var slotThree = Math.floor((Math.random() * 3) + 6);
        }

        var branchOne = Math.floor((Math.random() * 3));
        var branchTwo = Math.floor((Math.random() * 3));
        while (branchOne == branchTwo) {
            var branchTwo = Math.floor((Math.random() * 3));
        }

        if (firstTree == 'Domination' && branchOne == 3) {
            var secOne = Math.floor((Math.random() * 4) + (branchOne * 3));
        } else {
            var secOne = Math.floor((Math.random() * 3) + (branchOne * 3));
        }
        if (firstTree == 'Domination' && branchTwo == 3) {
            var secTwo = Math.floor((Math.random() * 4) + (branchTwo * 3));
        } else {
            var secTwo = Math.floor((Math.random() * 3) + (branchTwo * 3));
        }

        const exampleEmbed = new Discord.RichEmbed()
        .setTitle(`${tree[firstTree]} and ${tree[secondTree]}`)
        .attachFiles([`./assets/purple_heart.png`]) // Runes maybe here
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`Feed with these runes`)
        .addField(`${keystones[firstTree][keystone]}`, `Keystone`, true)
        .addField(`${slots[firstTree][slotOne]}`, `First Slot`, true)
        .addField(`${slots[firstTree][slotTwo]}`, `Second Slot`, true)
        .addField(`${slots[firstTree][slotThree]}`, `Third Slot`, true)
        .addBlankField()
        .addField(`${slots[secondTree][secOne]}`, `First Slot`, true)
        .addField(`${slots[secondTree][secTwo]}`, `Second Slot`, true)
        //.setImage(`attachment://${imgFile}`) // Runes maybe here
        .setTimestamp()
        .setFooter('Pentas not guaranteed', `attachment://purple_heart.png`);

        msg.channel.send(exampleEmbed);


	},
};