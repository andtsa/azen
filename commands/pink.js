const Discord = require("discord.js");

exports.run = async (client, message) => {
	message.channel.send({
		file: "./assets/pink.png"
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: `User`,
	secret: true
};

exports.help = {
	name: `pink`,
	category: `Miscelaneous`,
	description: `you made a typo`,
	extendedDescription: `you made a typo`,
	usage: `pink`
};
