/**
 * @file The index point of Ashe
 * @author Dim
 */

module.exports = {
	name: 'ping',
    description: 'Prints Pong and the time it takes to send',
	execute(msg, args) {
		const then = Date.now();
        msg.channel.send('pinging...').then(m =>{
            m.edit(`Pong! ${Date.now() - then}ms`);
        })
	},
};