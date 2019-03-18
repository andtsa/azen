module.exports = async (client) => {
  await client.wait(1000);

  client.log(
    `Starting..`,
    `Ready to serve ${client.users.size} users in ${
      client.guilds.size
    } servers.`,
    `Ready!`
  );

  client.user.setPresence({
    game: {
      name: `[IN DEV RN // MAY NOT WORK] a!help for help`,
      url: `https://www.twitch.tv/andreasaoneo`,
      type: 1
    }
  });

  client.guilds
    .filter(g => !client.settings.has(g.id))
    .forEach(g => client.settings.set(g.id, client.config.defaultSettings));

  client.guilds
    .filter(g => !client.tags.has(g.id))
    .forEach(g => client.tags.set(g.id, {}));
  
  await client.wait(15000);
  for (i = 7; i = 7; i = i) {
    // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    client.user.setPresence({
      game: {
        name: `[IN DEV] a!help for help`,
        url: `https://www.twitch.tv/andreasaoneo`,
        type: 1
      }
    });
    await client.wait(20000);
    // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    client.user.setPresence({
      game: {
        name: `[IN DEV] | on ${((client.guilds.size) * 15)} servers`,
        url: `https://www.twitch.tv/andreasaoneo`,
        type: 1
      }
    });
    await client.wait(3500);
    // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    client.user.setPresence({
      game: {
        name: `with ${((client.users.size) * 153)} users`,
        url: `https://www.twitch.tv/andreasaoneo`,
        type: 1
      }
    });
    await client.wait(3000);
    // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    client.user.setPresence({
      game: {
        name: `https://www.andreats.com/`,
        url: `https://www.twitch.tv/andreasaoneo`,
        type: 1
      }
    });
    await client.wait(4000);
    // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
    client.user.setPresence({
      game: {
        name: `the world crumble to pieces`,
        type: "WATCHING"
      }
    });
    await client.wait(9000);
    client.user.setPresence({
      game: {
        name: `a!help for help`,
        url: `https://www.twitch.tv/andreasaoneo`,
        type: 1
      }
    });
    await client.wait(4000);
  }
};
