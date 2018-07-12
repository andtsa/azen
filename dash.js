const Discord = require(`discord.js`);
const client = new Discord.Client()
// Also a better way to send embeds is:
var embed = new Discord.RichEmbed()
	.setAuthor(`Author name`, client.user.avatarURL)
	.setTitle(`title`)
	.setDescription(`description`)
	.addField(`A fieald title`, `conetm`)
	.addBlankField() //a blank field for spacing
	.addField(`inline`, `an inline field`, true)
	.setFooter(`footr text`, client.user.avatarURL)
	.setTimestamp();
	// Etc......
message.channel.send(embed);