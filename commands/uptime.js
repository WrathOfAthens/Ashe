/**
 * @file Prints the uptime of Ashe
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */

module.exports = {
	name: 'uptime',
    description: 'Prints the uptime of Ashe',
	execute(msg, args, upTimeStart) {
        console.log(`${upTimeStart}`);
        var mili = (Date.now() - upTimeStart);
        var seconds = Math.floor(mili/1000) % 60;
        var minutes = Math.floor((mili / 1000) / 60) % 60;
        var hours = Math.floor(mili / 3600000) % 24;
        var days = Math.floor(mili / 86400000);

		msg.channel.send(`Ashe has been up for +${days}:${hours}:${minutes}:${seconds}`);
	},
};