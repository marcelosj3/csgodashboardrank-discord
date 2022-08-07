import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import { commands } from "./commands";
import { interactionCreate } from "./interactions";

dotenv.config();

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

interactionCreate(client);

client.login(process.env.DISCORD_TOKEN);
