const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
		return message.channel.send(`I do not have the required permissions!`);
	}

	var name = args[0];
	var perms = args[1].toUpperCase();
	if (args[1] == `none`) {
		var perms = ``;
	}	
	var color = args[2];
	var hoist = args[3];
	var mentionable = args[4];

	message.guild.createRole({
		data: {
			name: name,
			permissions: perms,
			color: color,
			hoist: hoist,
			mentionable: mentionable,
		},
	})
		.then(role => {
			client.log(`Evnt`, `Created new role with name ${role.name}, ${role.permissions} and color ${role.color}`, `Role Created!`);
			message.channel.send(`Created new role with name ${role.name} and color ${role.color}`);
		})
		.catch(console.error)

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`newrole`, `createrole`, `makerole`],
	permLevel: 2,
	secret: true
};

exports.help = {
	name: `role`,
	category: `Moderation`,
	description: `Creates a new role.`,
	extendedDescription: `Creates a new role with the given values.`,
	usage: `role [name!] [permissions!] [color!] [hoist] [mentionable]`
};
