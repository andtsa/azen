const Discord = require(`discord.js`);
const randomPuppy = require(`random-puppy`);

exports.run = async (client, message, args) => {
	if (Number.isInteger(args[0])) {
		for (i = 0; i < args[0]; i++) {
			randomPuppy().then((result) => {
				let embed = new Discord.RichEmbed()
					.setTitle('Dogs')
					.setImage(result)
					.setColor(0xff6961)
					.setFooter(`© 2018 Dogs`, client.user.avatarURL);
				return message.channel.send(embed);
			}).catch((err) => {
				console.error(err);
			});
		}
	} else {
		randomPuppy().then((result) => {
			let embed = new Discord.RichEmbed()
				.setTitle('Dog')
				.setImage(result)
				.setColor(0xff6961)
				.setFooter(`© 2018 Doggos`, client.user.avatarURL);
			return message.channel.send(embed);
		}).catch((err) => {
			console.error(err);
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`dogs`, `puppy`, `doggo`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `dog`,
	category: `Fun`,
	description: `Sends a dog pic`,
	extendedDescription: `Send a random dog picture`,
	usage: `dog [times]`
};
