const Discord = require("discord.js");
const util = require('util');

exports.run = async (client, message) => {
    const settings = message.guild ?
        client.settings.get(message.guild.id) :
        client.config.defaultSettings;
    const { exec } = require('child_process');
    exec('python3 /Users/andreas/Documents/Development/node/azen/azen/util/tictactoe.py', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

    message.channel.send({
        file: "/Users/andreas/Documents/Development/node/azen/azen/data/games/ttt/move.png"
    });
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [`ttt`],
    permLevel: 0,
    secret: true
};

exports.help = {
    name: `tictactoe`,
    category: `Games`,
    description: `Tic tac toe game`,
    extendedDescription: `Play tic tac toe. Type \`${settings.prefix}ttt new pvc\` to start a new game against me`,
    usage: `tictactoe [new(pvp,pvc), play(1 to 9)]`
};