import axios from "axios";
import {
  REST,
  Routes,
  Client,
  GatewayIntentBits,
  Interaction,
  blockQuote,
  codeBlock,
} from "discord.js";

import dotenv from "dotenv";
import { API } from "./services";

dotenv.config();

const commands = [
  {
    name: "kills",
    description: "Replies with a rank of kills",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID!,
        process.env.DISCORD_GUILD_ID!
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "kills") {
    const kills = await API.get("ranks/kills");

    const killsList = `${kills.data
      .map((kill: any, index: number) => {
        return `${index < 9 ? "0" : ""}${index + 1} | name: ${
          kill.name
        } - kills: ${kill.kills}`;
      })
      .join("\n")}`;
    console.log();

    await interaction.reply({
      content: codeBlock(killsList.slice(0, 1000)),
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
