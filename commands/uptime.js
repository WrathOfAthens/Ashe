/**
 * @file Prints the uptime of Ashe
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */

const { upTimeStart } = require('../app.js');
module.exports = {
	name: 'uptime',
    description: 'Prints the uptime of Ashe',
	execute(msg, args) {
        var mili = (Date.now() - upTimeStart);
        var minutes = (mili / 1000) / 60;
        var hours = mili / 3600000;
        var days = mili / 86400000;

		msg.channel.send(`Ashe has been up for +${days}:${hours}:${minutes}:${mili/1000}`);
	},
};