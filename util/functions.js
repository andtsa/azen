const Discord = require(`discord.js`);
const ytdl = require(`ytdl-core`);
const YouTube = require(`simple-youtube-api`);


module.exports = client => {
  const youtube = new YouTube(client.config.googleApiKey);
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  client.log = (type, msg, title) => {
    if (!title) title = `Log`;
    console.log(`[${type}] [${title}] ${msg}`);
  };

//   client.awaitReply = async (msg, question, limit = 60000) => {
//     const filter = m => (m.author.id = msg.author.id);
//     await msg.channel.send(question);
//     try {
//       const collected = await msg.channel.awaitMessages(filter, {
//         max: 1,
//         time: limit,
//         errors: [`time`]
//       });
//       return collected.first().content;
//     } catch (e) {
//       return false;
//     }
//   };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == `Promise`) {
      text = await text;
    }
    if (typeof evaled !== `string`) {
      text = require(`util`).inspect(text, { depth: 0 });
    }

    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(
        client.token,
        `--snip--`
      );

    return text;
  };

  client.send = async (channel, title, content, color) => {
    let embed = new Discord.RichEmbed()
      .addField(title, content)
      .setColor(!color ? 0xff6961 : color)
      .setFooter(`© 2018 Andreasaoneo || https://andreas.aoneo.cc/`, client.user.avatarURL);
    channel.send(embed);
  };

  client.play = async (connection, message, args) => {
    var server = client.servers[message.guild.id];

    client.send(message.channel, `Playing: ${server.queue[0].title} by ${server.queue[0].artist}!`, `<${server.queue[0].url}> \n ${server.queue[0].duration}`);
    client.log(`Log`, `Playing: ${server.queue[0].title} by ${server.queue[0].artist} in guild ${message.guild.name}`, `EVNT`);
    client.servers[message.guild.id].playing = true;
    connection.playStream(ytdl(server.queue[0].url, {
      filter: 'audioonly'
    }));

    server.queue.shift();

    connection.dispatcher.on('end', () => {
      if (server.queue[0]) {
        client.log(`Log`, `Song Ended!`, `EVNT`);
        client.play(connection, message, args);
      } else {
        client.log(`Log`, `Last Song Ended, disconnecting from ${message.guild.name}`, `EVNT`);
        client.servers[message.guild.id].playing = false;
        connection.disconnect();
      }
    });
  }

  String.prototype.toProperCase = function() {
    return this.replace(
      /([^\W_]+[^\s-]*) */g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = require(`util`).promisify(setTimeout);

  process.on(`uncaughtException`, err => {
    console.log(Date());
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`);
    console.error(`Uncaught Exception: `, errorMsg);
    process.exit(1);
  });

  process.on(`unhandledRejection`, err => {
    console.log(Date());
    console.error(`Uncaught Promise Error: `, err);
  });
};

