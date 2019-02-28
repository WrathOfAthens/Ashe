/**
 * @file Purges 'x' number of messages
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */
const Keyv = require('keyv');
const keyv = new Keyv(`${process.env.mongodb}`);

module.exports = {
	name: 'purge',
    description: 'Deletes 2-100 messages [MUST BE ENABLED]',
    args: '[number of messages] OR [enable] OR [disable]',
	async execute(msg, args) {
        if (!args[0]) return msg.channel.send(`Expecting arguments`);
        
        if (args[0] === 'enable') {
            console.log()
            if (msg.author.id != msg.guild.ownerID) return msg.channel.send(`Only the owner can do this`);

            await keyv.set(`PURGE${msg.guild.id}`, true);
            return msg.channel.send(`Purge is now enabled.`);
        } else if (args[0] === 'disable') {
            if (msg.author.id != msg.guild.ownerID) return msg.channel.send(`Only the owner can do this`);

            await keyv.set(`PURGE${msg.guild.id}`, false);
            return msg.channel.send(`Purge is now disabled.`);
        }

        const purgeEnabled = await keyv.get(`PURGE${msg.guild.id}`);

        if (purgeEnabled === true) {
            return msg.channel.send(`Purge is enabled.`);
        } else {
            return msg.channel.send(`Purge is disabled.`);
        }

	},
};
