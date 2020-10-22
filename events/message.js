const Discord = require(`discord.js`);
module.exports = (client, message) => {
  //client.blockMessage(message);


//// Messageblocking temp

  if (message.guild && message.author != client.user) {
    const settings = message.guild ?
      client.settings.get(message.guild.id) :
      client.config.defaultSettings;

    const MBlevel = client.permlevel(message);
    let modlog = message.guild.channels.find(channel => channel.name === settings.modLogChannel);

    if (settings.blocked && settings.blocked[message.channel.id]) { 
      for (let i = 0; i < (settings.blocked[message.channel.id]).length; i++) {
        if (message.content.indexOf(settings.blocked[message.channel.id][i]) != -1) {
          message.delete().then(() => {
            client.log(
              `Delete`,
              `Message "${message.content}" by ${message.author.tag} deleted in #${message.channel.name}`
            );
            if (!modlog) {
              console.log(`No modlog`);
            } else if (settings.modLogEnabled.toLowerCase() === `true`) {
              let embed = new Discord.RichEmbed()
                .setTitle('MessageBlock')
                .setAuthor('Mod-log entry | Block', message.author.avatarURL)
                .addField(`Author:`, message.author.tag)
                .addField(`Message:`, message.content, true)
                .setTimestamp()
                .setColor(0xff6961)
              modlog.send(embed);
            }
          });
        }
      }
    }
  }


  //console.log(message.channel.id, message.channel.name, message.content)
  // if (
  //   message.channel.id == `767397245304700948` &&
  //   (message.content.indexOf(`roi des merguez`) != -1 ||
  //     message.content.indexOf(`Malo.`) != -1 ||
  //     message.content.indexOf(`Lord Eggnog`) != -1)
  // )
  //   message.delete().then(() => {
  //     client.log(
  //       `Delete`,
  //       `Message "${message.content}" by ${message.author.tag} deleted in #${message.channel.name}`
  //     );
  //   });

  if (message.channel.id == `758626666921721856` && message.content.indexOf(`0 RADIANCE`) != -1) message.react(`😞`);

  if (message.author.bot) return;
  
  const settings = message.guild ?
    client.settings.get(message.guild.id) :
    client.config.defaultSettings;

  message.settings = settings;
  if (settings.inviteBlock == true && message.content.indexOf("discord.gg") !== -1 && message.channel.type != "dm") {
    message.delete();
    client.log(
      `Block`,
      `${client.config.permLevels.find(l => l.level === level).name} ${
        message.author.username
      } (${message.author.id}) posted an invite link`,
      "INV"
    );
  }

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
  const level = client.permlevel(message);

  let cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (message.isMentioned(client.user) && cmd == null) {
    cmd =
      client.commands.get('help') ||
      client.commands.get(client.aliases.get('help'));
  }
  if (message.content.toLowerCase().indexOf(settings.prefix.toLowerCase()) !== 0 && !message.isMentioned(client.user)) return;
  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send(
      `This command is only for use in a guild/server.`
    );
  }

  if (level < cmd.conf.permLevel) {
    return message.author.send(
      `**[CMD]** You do not have permission to use this command. Your permission level is ${
        client.config.permLevels.find(l => l.level === level).name
      } (${level}). This command requires level ${
        client.config.permLevels.find(l => l.level === cmd.conf.permLevel).name
      } (${cmd.conf.permLevel})`
    );
  }
  client.log(
    `Log`,
    `${client.config.permLevels.find(l => l.level === level).name} ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`,
    "CMD"
  );
  cmd.run(client, message, args, level);
};
