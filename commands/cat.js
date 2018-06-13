const Discord = require(`discord.js`);
const { get } = require("snekfetch"); 
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient("HqxYG1faw1E1WYsToglY5eQ4tpZBGvly");

exports.run = async (client, message, args) => {
	if (Number.isInteger(args[0])) {
		for (i = 0; i < args[0]; i++) {
			try {
				get(`http://aws.random.cat/meow`).then((result) => {
					let embed = new Discord.RichEmbed()
						.setTitle('Cat')
						.setImage(result.body.file)
						.setColor(0xff6961)
						.setFooter(`© 2018 Cats`, client.user.avatarURL);
					return message.channel.send(embed);
				}).catch((err) => {
					console.error(err);
				});
			} catch (e) {
				return console.error(e);
			}
		}
	} else if (args[0] == 'gif') {
		giphy.random('gifs', {
			"tag": "cat"
		}).then((res) => {
			let embed = new Discord.RichEmbed()
				.setTitle('Cat')
				.setImage(res.gifObject.embed_url)
				.setColor(0xff6961)
				.setFooter(`© 2018 Cats`, client.user.avatarURL);
			return message.channel.send(embed);
		}).catch((err) => {
			console.error(err);
		});
	} else {
		try {
			get(`http://aws.random.cat/meow`).then((result) => {
				let embed = new Discord.RichEmbed()
					.setTitle('Cat')
					.setImage(result.body.file)
					.setColor(0xff6961)
					.setFooter(`© 2018 Cats`, client.user.avatarURL);
				return message.channel.send(embed);
			}).catch((err) => {
				console.error(err);
			});
		} catch (e) {
			return console.error(e);
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`cats`, `c`],
	permLevel: `User`,
	secret: false
};

exports.help = {
	name: `cat`,
	category: `Cats`,
	description: `Sends a cat pic`,
	extendedDescription: `Send a random cat picture`,
	usage: `cat [times]`
};
