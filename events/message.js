module.exports = (client, message) => {
  if (message.author.bot) return;

  const settings = message.guild
    ? client.settings.get(message.guild.id)
    : client.config.defaultSettings;

  message.settings = settings;

  const args = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g)
    .slice(1);
  const command = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g)[0];

  const level = client.permlevel(message);

  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (
    settings.inviteBlock &&
    message.content.indexOf("discord.gg") !== 0 &&
    message.channel.type != "dm"
  ) {
    message.delete();
    client.log(
      `Block`,
      `${client.config.permLevels.find(l => l.level === level).name} ${
        message.author.username
      } (${message.author.id}) posted an invite link`,
      "INV"
    );
  }

  if (message.content.indexOf(settings.prefix) !== 0 && message.mentions.USERS_PATTERN != `<@361955559806730240>`) return;

  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send(
      `This command is only for use in a guild/server.`
    );
  }

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === `true`) {
      return message.author.send(
        `[**CMD**] You do not have permission to use this command. Your permission level is ${level} (${
          client.config.permLevels.find(l => l.level === level).name
        }). This command requires level ${
          client.levelCache[cmd.conf.permLevel]
        } (${cmd.conf.permLevel})`
      );
    }
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
