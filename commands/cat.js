const Discord = require(`discord.js`);
const { get } = require("snekfetch"); 
const GphApiClient = require("giphy-js-sdk-core");
const giphy = GphApiClient("HqxYG1faw1E1WYsToglY5eQ4tpZBGvly");

exports.run = async (client, message, args) => {
	let msg = await message.channel.send(`Meow...`);
	if (Number.isInteger(args[0])) {
		for (i = 0; i < args[0]; i++) {
			try {
				let file = (await get(`http://aws.random.cat/meow`)).body.file;
				let embed = new Discord.RichEmbed()
					.setTitle('Cat')
					.setImage(file)
					.setColor(0xff6961)
					.setFooter(`© 2019 Cats`, client.user.avatarURL);
				msg.delete();
				return message.channel.send(embed);
				// .then((result) => {
				// 	
				// }).catch((err) => {
				// 	console.error(err);
				// });
			} catch (e) {
				msg.edit(`Failed!`);
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
				.setFooter(`© 2019 Cats`, client.user.avatarURL);
			msg.delete();
			return message.channel.send(embed);
		}).catch((err) => {
			msg.edit(`Failed!`);
			console.error(err);
		});
	} else {
		try {
			await get(`http://aws.random.cat/meow`).then((result) => {
				let embed = new Discord.RichEmbed()
					.setTitle('Cat')
					.setImage(result.body.file)
					.setColor(0xff6961)
					.setFooter(`© 2019 Cats`, client.user.avatarURL);
				msg.delete();
				return message.channel.send(embed);
			}).catch((err) => {
				console.error(err);
			});
		} catch (e) {
			msg.edit(`Failed!`);
			return console.error(e);
		}
	}
	msg.edit(`Failed!`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`cats`, `c`],
	permLevel: 0,
	secret: false
};

exports.help = {
	name: `cat`,
	category: `Fun`,
	description: `Sends a cat pic`,
	extendedDescription: `Send a random cat picture`,
	usage: `cat [times]`
};
