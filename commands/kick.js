/**
 * @file Kicks a user from a server `args[1]` being the reson for kick
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */

module.exports = {
	name: 'kick',
    description: 'Kicks a user',
    use: '[username] [reason]',
    /**
     * Module is called and kicks a user mentioned
     * by the user and prints conformation and a 
     * reason. Will print a failure statment if 
     * the mentioned user is not kickable.
     * 
     * @param {Message} msg
     * @param {Array} args 
     */
	execute(msg, args) {
        const member = msg.mentions.members.first();
        const auth = msg.channel.members.get(msg.author.id);
        if (args.length){ 
            var reasonArr = [args[1]];
            var max = args.length;
            for (var i = 2; i < max; i++) {
                reasonArr.push(` ${args[i]}`);
            }
            var reason = reasonArr.toString();
            reason = reason.replace(/,/g, '');
        }
        msg.channel.send(`Kicking: ${member.displayName}`).then(m => {
            if (member.kickable == false) {
                m.edit(`Meow! I don't have permission to kick ${member.displayName}`);
                return;
            } else if (auth.hasPermission('KICK_MEMBER') == false) {
                m.edit(`Meow! You don't have permission to kick ${member.displayName}`);
                return;
            }
            member.kick(args[1]).then(member => {
                console.log(`User: ${msg.author.username} kicked ${member.displayName}`);
                m.edit(`User: ${msg.author.username} kicked ${member.displayName} for ${reason}`)
            }).catch(console.error);
        }).catch(console.error);
	},
};