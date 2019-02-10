/**
 * @file Rolls a die or dice with face and ammount decleared by the user
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */

module.exports = {
	name: 'roll',
    description: 'Rolls a die or dice',
    use: 'd[sides] (optional)[ammount of dice]',
    /**
     * Module is called and either prints a random number
     * from 1 - `arg[0]` or an array of `arg[1]` numbers 
     * from 1 - `arg[0]` and the total sum of the array
     * 
     * @param {Message} msg 
     * @param {Array} args
     */
	execute(msg, args) {
        var sides = args[0].slice(1);
        var amt = args[1];
        if (!args[0].startsWith('d')) {
            msg.channel.send(`Correct format is: roll d[sides] (optional)[ammount of dice]`)
            return;
        }
		if (args[1] != null) {
            var rollList = [];
            var total = 0;
            for (var x = 0; x < amt; x++) {
                var temp = Math.floor((Math.random() * sides) + 1);
                total += temp;
                rollList.push(temp);
            }
            msg.channel.send(`*${msg.author.username}*: **${total}** [${rollList}]`);
        } else {
            msg.channel.send(`*${msg.author.username}*: **${Math.floor((Math.random() * sides) + 1)}**`);
        }
	},
};