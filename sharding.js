import { Client } from "discord.js";

const Discord = require("discord.js");
const Manager = new Discord.ShardingManager("./index.js");
Manager.spawn(Math.round(Client.guilds.size / 500));
