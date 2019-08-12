if (message.content.toLowerCase().indexOf(settings.prefix.toLowerCase()) === 0) {
	const args = message.content
		.slice(settings.prefix.length)
		.trim()
		.split(/ +/g)
		.slice(1);
	const command = message.content
		.slice(settings.prefix.length)
		.trim()
		.split(/ +/g)[0]
		.toLowerCase();
} else if (message.content.indexOf(`@Azen`) === 0) {
	const args = message.content
		.slice()
		.trim()
		.split(/ +/g)
		.slice(1);
	const command = message.content
		.slice(message.mentions.first().length)
		.trim()
		.split(/ +/g)[0]
		.toLowerCase();
} else if (message.content.toLowerCase().indexOf(settings.prefix.toLowerCase()) === -1 && message.channel.type == "dm") {
	const args = message.content
		.split(/ +/g)
	const command = message.content
		.trim()
		.split(/ +/g)[0]
		.toLowerCase();
} else {
	return;
}