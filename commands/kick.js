const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let kickPerms = message.guild.member(client.user).hasPermission('KICK_MEMBERS');
    let user = message.guild.members.find(user => {
        args[0]
    });
    let reas = args;
    reas.shift();
    let reason = reas.join(' ');
    let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);



};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`kill`],
    permLevel: 2,
    secret: false
};

exports.help = {
    name: `kick`,
    category: `Moderation`,
    description: `Pong! Checks delay time.`,
    extendedDescription: `Pong! I will tell you how long the message took to send!`,
    usage: `ping`
};
