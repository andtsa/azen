const config = {
  owners: [``],

  testers: [],

  admins: [``],

  developers: [],

  support: [],

  designers: [],

  donators: [],

  // MzgyNzQ3MzA5ODYxMjQwODMz.DPaMxQ.TyvR6gk7Aldkonc9z4ADOgAos80 AndreasBot https://discordapp.com/oauth2/authorize?client_id=382747309861240833&permissions=2146958591&scope=bot
  // MzYxOTU1NTU5ODA2NzMwMjQw.DKvWLA.KVzRrqJi2YmxUDbn8z8uCPGo8Rs Azen
  // MzkyMDk3NTQ5MzE1NzM1NTcy.DRiX-g.OvxcNsRnGt0s1YH-TEhq95UIDR8 rndm
  // Mzc3ODY0NDgxNjMzNzMwNTYz.DesyCg.UCi1dfQve1oHHl_Bg9ZCxp1UvHo node.py
  token: ``,
  googleApiKey: ``,

  defaultSettings: {
    prefix: `a!`,
    modLogChannel: `log`,
    modLogEnabled: `false`,
    modRole: `Mod`,
    adminRole: `Admin`,
    inviteBlock: `false`,
    welcomeChannel: `welcome`,
    welcomeMessage: `Please welcome {{mention}}, everyone!`,
    welcomeEnabled: `false`,
    announcementChannel: `announcements`
  },

  permLevels: [{
      level: 0,
      name: `User`,
      check: () => true
    },
    {
      level: 1,
      name: `Donator`,
      check: message => config.donators.includes(message.author.id)
    },
    {
      level: 2,
      name: `Moderator`,
      check: message => {
        try {
          const modRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 3,
      name: `Administrator`,
      check: message => {
        try {
          const adminRole = message.guild.roles.find(
            r =>
            r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          return adminRole && message.member.roles.has(adminRole.id);
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 4,
      name: `Server Owner`,
      check: message =>
        message.channel.type === `text` ?
        message.guild.owner.user.id === message.author.id :
        false
    },

    {
      level: 5,
      name: `Designer`,
      check: message => config.designers.includes(message.author.id)
    },

    {
      level: 7,
      name: `Bot Support`,
      check: message => config.support.includes(message.author.id)
    },

    {
      level: 8,
      name: `Developer`,
      check: message => config.developers.includes(message.author.id)
    },

    {
      level: 9,
      name: `Bot Admin`,
      check: message => config.admins.includes(message.author.id)
    },

    {
      level: 10,
      name: `Beta Tester`,
      check: message => config.testers.includes(message.author.id)
    },

    {
      level: 11,
      name: `Bot Owner`,
      check: message => config.owners.includes(message.author.id)
    }
  ]
};

module.exports = config;
