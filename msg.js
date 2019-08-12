const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.js');

bot.on('ready', () => {
	console.log('MSGBot Ready!');
});

bot.on('message', message => {
	if (message.guild) {
		console.log(`[MSG], [BY: ${message.author.tag}] [IN: ${message.guild.name}]: "${message.content}"`);
	} else {
		console.log(`[MSG], [BY: ${message.author.tag}] [IN: DM]: "${message.content}"`);
	}
});

bot.login(config.token);