const Discord = require(`discord.js`);
const { inspect } = require(`util`);
const fs = require(`fs`)

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

    if (key == `blocked`){
        if (!settings[key][value[0]]) { 
            settings[key][value[0]] = []
        }
        settings[key][value[0]].push((value.slice(1)).join(` `))
    } else {
        settings[key] = value.join(` `);
    }
    

    

    client.settings.set(message.guild.id, settings);

    fs.readFile(`./data/settings.json`, (err, data) => {
        let json = JSON.parse(data)
        if (err) {
            client.error(`readFile`, err, `Error reading settings file`)
            console.log(json)
        }
        
        json[message.guild.id] = (client.settings.get(message.guild.id))

        fs.writeFile(`./data/settings.json`, JSON.stringify(json), err => {
            if (err) {
                return client.error(`Settings FileWrite`, `Error `+err, `Error writing to server settings save file:`);
            }
        });
    });

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
