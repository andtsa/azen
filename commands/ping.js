const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  const msg = await message.channel.send(`Pinging...`);
  const embed = new Discord.RichEmbed()
    .addField(`Pong! :ping_pong:`, `Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
    .setColor(0xff6961)
    .setFooter(`© 2018 Andreasaoneo || https://andreas.aoneo.cc/`, client.user.avatarURL);
  msg.edit(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`pong`, `delay`, `speed`, `p`],
  permLevel: 0,
  secret: false
};

exports.help = {
  name: `ping`,
  category: `Miscelaneous`,
  description: `Pong! Checks delay time.`,
  extendedDescription: `Pong! I will tell you how long the message took to send!`,
  usage: `ping`
};
