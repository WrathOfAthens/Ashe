/**
 * @file Bans a user from a server `args[2]` being the reson for ban
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */

module.exports = {
	name: 'ban',
    description: 'Bans a user and deletes messages for given number of days',
    use: '[username] [reason]',
    /**
     * Module is called and bans a user mentioned
     * by the user and prints conformation and a 
     * reason. Will print a failure statment if 
     * the mentioned user is not banable.
     * 
     * @param {Message} msg
     * @param {Array} args 
     */
	execute(msg, args) {
        var member = msg.mentions.members.first();
        if (args.length){ 
            var reasonArr = [args[1]];
            var max = args.length;
            for (var i = 2; i < max; i++) {
                reasonArr.push(` ${args[i]}`);
            }
            var reason = reasonArr.toString();
            reason = reason.replace(/,/g, '');
        }
        msg.channel.send(`Banning: ${member.displayName}`).then(m => {
            if (member.bannable == false) {
                m.edit(`Meow! I don't have permission to ban ${member.displayName}`);
                return;
            }
            member.ban(reason).then(member => {
                console.log(`User: ${msg.author.username} banned ${member.displayName}`);
                m.edit(`User: ${msg.author.username} banned ${member.displayName} for ${reason}`)
            }).catch(console.error);
        }).catch(console.error);
	},
};