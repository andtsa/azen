const Discord = require(`discord.js`);
const { inspect } = require(`util`);

exports.run = async (client, message, [key, ...value], level) => { // eslint-disable-line no-unused-vars
    const settings = client.settings.get(message.guild.id);

    console.log(settings);

    if (!key) {
        return message.channel.send(inspect(settings), {
            code: `json`
        });
    }
    if (!settings[key]) {
        return client.send(message.channel, `Error!`, `That key does not exist!`);
    }

    if (!value) {
        if (!settings[key]) {
            client.send(message.channel, `Error!`, `This key does not exist in the settings`)
        }
        return message.reply(`The value of ${key} is currently \`${settings[key]}\``);
    }

    settings[key] = value.join(` `);

    client.settings.set(message.guild.id, settings);

    return client.send(message.channel, `Success!`, `\`${key}\` successfully edited to \`${value.join(` `)}\``);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`setting`, `settings`, `conf`, `edit`],
    permLevel: 3,
    secret: false
};

exports.help = {
    name: `set`,
    category: `System`,
    description: `Settings for this server`,
    extendedDescription: `Set the bot settings for the server. Requires admin permissions`,
    usage: `set [key] [value]`
};
