/**
 * @file Lists or changes prefix
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */
const Keyv = require('keyv');
const keyv = new Keyv(`${process.env.mongodb}`); // Replace with process.env.mongodb


module.exports = {
	name: 'prefix',
    description: 'Lists or changes prefix',
    use: '[prefix]',
    /**
     * Prefix either displays or changes the
     * command prefix by printing the passed
     * 'prefix' or prints the requested prefix
     * to a hash map using the guild id as and
     * adress.
     * 
     * @param {Message} msg 
     * @param {Array} args 
     * @param {String} prefix 
     */
	async execute(msg, args, prefix) {
        
        if (args.length) {
            await keyv.set(msg.guild.id, args[0]);
            return msg.channel.send(`Successfully set prefix to \`${args[0]}\``);
        }
        return msg.channel.send(`Prefix is \`${await keyv.get(msg.guild.id) || prefix}\``);

	},
};