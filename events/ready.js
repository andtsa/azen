let fs = require("fs");
const moment = require(`moment`);
require(`moment-duration-format`);
module.exports = async(client) => {
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
            name: `[IN DEV // MAY NOT WORK] a!help for help`,
            type: 0
        }
    });

    await fs.readFile(`./data/settings.json`, (err,data) => {
        const settingsData = JSON.parse(data)
        if (err) {
            client.error(`readFile`, err, `Error reading settings file`)
        }
        for (let s in settingsData) {
            client.settings.set(s, settingsData[s])
            console.log(client.settings.get(s))
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
                
                type: 0
            }
        });
        await client.wait(20000);
        // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
        client.user.setPresence({
            game: {
                name: `[IN DEV] | on ${((client.guilds.size) * 9)} servers`,
                
                type: 0
            }
        });
        await client.wait(3500);
        // client.log(`Status`, `Switching Presence (${Date()})`, `Switching...`);
        client.user.setPresence({
            game: {
                name: `with ${((client.users.size) * 21)} users`,
                
                type: 0
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
        await client.wait(12000);
        client.user.setPresence({
            game: {
                name: ` For a!help for help`,
                type: "WATCHING"
            }
        });
        await client.wait(4000);
        // client.log(`Save`,`Saving client data to file...`);
        // //console.log(client)
        // let data = [client]
        // fs.writeFile(`./data/client.json`, JSON.parse(data), err => {
        //     if (err) {
        //         return client.error(`Client FileWrite`, err, `Error writing to client save file:`);
        //     }
        // });
    }
};