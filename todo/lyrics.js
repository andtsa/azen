const Discord = require("discord.js");
const { get } = require("snekfetch");
music = require('musicmatch')({
	apikey: "85607b56d55ed0f83f89e12c5c06e88d"
});


exports.run = async (client, message, args) => {
	if (!args) {
		if (client.servers[message.guild.id]) {
			if (client.servers[message.guild.id].playing == true && client.servers[message.guild.id].queue && message.guild.voiceConnection) {
				// music.matcherLyrics({
				// 	q_track: client.servers[message.guild.id].queue.title,
				// 	q_artist: client.servers[message.guild.id].queue.artist
				// }).then(function (data) {
				// 	console.log(data);
				// }).catch(function (err) {
				// 	console.log(err);
				// });

			} else {
				return message.channel.send('Please provide a song name');
			}
		}
	} else {
		// get(`http://api.musixmatch.com/ws/1.1/mathcer.lyrics.get?apikey=85607b56d55ed0f83f89e12c5c06e88d&q_track=${args.join(' ')}&format=jsonp&callback=callback`).then((result) => {
		// 	let lyrics = result.message.body.lyrics.lyrics_body;
		// 	console.log(lyrics);
		// }).catch((err) => {
		// 	console.error(err);
		// });
		music.matcherLyrics({
			q_track: args.join(' '),
		}).then(function (data) {
			console.log(data);
		}).catch(function (err) {
			console.log(err);
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [`l`, `lyr`, `lirics`, `lyrycs`, `lirycs`, `lyric`],
	permLevel: 0,
	secret: true
};

exports.help = {
	name: `lyrics`,
	category: `Music`,
	description: `Sends song lyrics!`,
	extendedDescription: `Send the lyrics of the currently playing song or the given song`,
	usage: `lyrics [song name (optional)]`
};