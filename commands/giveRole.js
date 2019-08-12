const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const level = client.permlevel(message);
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(`I do not have the required permissions!`);
    }
    if (!message.mentions.members) return client.send(message.channel, `Syntax Error!`, `You must mention at least one user`);
    if (!args[1]) return client.send(message.channel, `Syntax Error!`, `You must specify a role!`);
    console.log(args);
    var users = (message.mentions.members);
    users.array();
    let roleName;
    if(args.length > 2) {
        let roleNameArgs = args.splice(1,args.length);
        roleName = roleNameArgs.join(' ');
    } else {
        roleName = args[1];
    }
    if (!message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase())) return client.send(message.channel, `Error!`, `That role doesn't exist!`);
    else {
        console.log(users);
        users[0].addRole(message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase()))
            .then(role => {
                client.log(`Evnt`, `Added role ${role.name} to ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id})`, `Role Added!`);
                message.channel.send(`Added role ${role.name} to ${message.author.username}`);
            })
            .catch(console.error);
    }
    

};

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: [`gr`,`addrole`,`addRole`,`giveRole`],
    permLevel: 3,
    secret: true
};

exports.help = {
    name: `addRole`,
    category: `Moderation`,
    description: `Adds a role to a user`,
    extendedDescription: `Adds the asked for role to the mentioned user`,
    usage: `addRole [user mention!] [role name!]`
};
