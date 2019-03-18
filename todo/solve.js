const discord = require("discord.js");
const math = require("algebrite");

exports.run = async (client, message, args) => {
	if (!args) return message.channel.send(`You have to send something`);
	let fn = parseInt(args[0]);
	let op = args[1];
	let sn = parseInt(args[2]);
	let res = 0;
	switch (op) {
		case "+":
			res = fn + sn;
			break;
		case "-":
			res = fn - sn;
			break;
		case "*":
			res = fn * sn;
			break;
		case "/":
			res = fn / sn;
			break;
		case "**":
			res = Math.pow(fn, sn);
			break;
		case "rt":
			res = Math.pow(fn, 1/sn);
			break;
		default:
			const settings = message.guild // eslint-disable-line
				? client.settings.get(message.guild.id)
				: client.config.defaultSettings;
			return client.send(message.channel, `Correct Usage \`${settings.prefix}solve\``, `**${settings.prefix}solve** \n Addition: \` n1 + n2\`\n Substraction: \` n1 - n2\`\n Multiplication: \` n1 * n2\`\n Division: \` n1 / n2\`\n Exponents/Powers: \` base ** exponent\`\n Roots (ⁿ¹√n2): \` rootn rt n\`\n `);
	}
	return message.channel.send(res);
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`sovle`, `sv`, `calc`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `solve`,
	category: `Math (more to come soon. ∫, Σ, 𝔁)`,
	description: `Solves an equation`,
	extendedDescription: `Solves the given math equation`,
	usage: `solve [first number] [operator (+,-,*,/,**,rt)] [second number]`
};
