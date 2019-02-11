/**
 * @file The index point of Ashe
 * @author WrathOfAthens
 * @license GNU-GPLv3
 */

const fs = require('fs');
const Discord = require('discord.js');
const { version } = require('./package.json');
const token = process.env.token;
const globalPrefix = process.env.prefix;
const upTimeStart = Date.now();
const Keyv = require('keyv');
const keyv = new Keyv(`${process.env.mongodb}`);

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

/** @constant {string[]} commandFiles Dynamically retrieves all newly created command files @author discord.js*/
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/** 
 * Iterates through `commandFiles` and requires those files
 * @author discord.js
 */
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// Handles connection errors
keyv.on('error', err => console.error('Keyv connection error:', err));

/**
 * When the bot is ready and functioning prints app information to console
 */
bot.on('ready', () => {
    console.log(`=================\nAshe(${version}) by WrathOfAthens\nLogged in as ` +
        `${bot.user.tag} (${bot.user.id}) on ${bot.guilds.size} server(s)\nMeow!\n=================\n`);
    bot.user.setActivity(`${globalPrefix}help | ${bot.guilds.size} servers`);
});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setActivity(`${globalPrefix}help | ${bot.guilds.size} servers`);
  });
  
  bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`${globalPrefix}help | ${bot.guilds.size} servers`);
  });

/**
 * on 'message' is a Event Listener for all messages sent but 
 * only interacts with users and the message has the prefix
 */
bot.on('message', async msg => {
    if (msg.author.bot) return;
    let prefix;
    // Gets guildPrefix from database
    const guildPrefix = await keyv.get(msg.guild.id);

    // Checks for guildPrefix or globalPrefix
    if (msg.content.startsWith(guildPrefix)) {
        prefix = guildPrefix;
    } else if (msg.content.startsWith(globalPrefix)) {
        prefix = globalPrefix;
    } else return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    ///console.log(`Args: ${args}\nCommand: ${command}`); // DEBUG
    ///console.log(args.length); // DEBUG

    if(!bot.commands.has(command)) return;

    try {
        if(command === 'uptime') {
            bot.commands.get(command).execute(msg, args, upTimeStart);
        } else if (command === 'help') {
            bot.commands.get(command).execute(msg, args, prefix);
        } else if (command === 'prefix') {
            bot.commands.get(command).execute(msg, args, prefix);
        } else {
            bot.commands.get(command).execute(msg, args);
        }
    } catch (error) {
        if (error instanceof TypeError) {
            msg.channel.send(`Could not find user ${args[0]}`);
            console.error(error);
        } else {
        console.error(error);
        msg.channel.send('Meow! There was an error trying to execute that command!');
        }
    }
});

// Login and Token
bot.login(token);
