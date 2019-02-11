/**
 * @file The help command of Ashe
 * @author discord.js
 */
/** @todo Finish commenting help.js */

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	use: '[command name]',
	/**
	 * The help command displays all commands avalible 
	 * to the user dynamically by creating a map of all
	 * commands that have been reconized by the 'fs' 
	 * function in 'app.js'
	 * OR the user provides a command in 'args' and 
	 * the help command displays all information in the
	 * command, pushes it to an array then prints the text.
	 * 
	 * @param {Message} message 
	 * @param {Array} args 
	 * @param {String} prefix 
	 */
	execute(message, args, prefix) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Meow! I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('It seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('I don\'t know that command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.use) data.push(`**Usage:** ${prefix}${command.name} ${command.use}`);

		//data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};