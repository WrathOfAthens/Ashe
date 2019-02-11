/**
 * @file Ashe's about information
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */
const { version } = require('../package.json');

module.exports = {
	name: 'about',
    description: 'Prints information about Ashe',
	execute(msg, args) {
		msg.author.send(`=================\nAshe(${version}) by WrathOfAthens\nLogged in as ` +
        `${bot.user.tag} (${bot.user.id}) on ${bot.guilds.size} server(s)\nMeow!\n=================\n`)
	},
};
