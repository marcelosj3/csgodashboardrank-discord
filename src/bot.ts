import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import { commands } from "./commands";
import { interactionCreate } from "./interactions";
import { Logger, LoggerLevel, LoggerName } from "./utils";

dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    Logger(
      LoggerName.HEROKU,
      LoggerLevel.INFO,
      "Started refreshing application (/) commands."
    );

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID!,
        process.env.DISCORD_GUILD_ID!
      ),
      {
        body: commands,
      }
    );

    Logger(
      LoggerName.HEROKU,
      LoggerLevel.INFO,
      "Successfully reloaded application (/) commands."
    );
  } catch (error: unknown) {
    Logger(LoggerName.HEROKU, LoggerLevel.ERROR, error);
  }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", async () => {
  Logger(
    LoggerName.DISCORD,
    LoggerLevel.INFO,
    `Logged in as ${client.user!.tag}!`
  );

  const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID!);
  Logger(LoggerName.DISCORD, LoggerLevel.INFO, `Fetch guild: ${guild?.name}!`);

  Logger(
    LoggerName.DISCORD,
    LoggerLevel.INFO,
    `Starting to create commands...`
  );
  try {
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];

      Logger(
        LoggerName.DISCORD,
        LoggerLevel.INFO,
        `Creating command: ${command}`
      );
      await guild?.commands.create({
        name: command.name,
        description: command.description,
        options: command.options,
      });
      Logger(
        LoggerName.DISCORD,
        LoggerLevel.INFO,
        `Successfully created command: ${command}`
      );
    }
  } catch (error: unknown) {
    Logger(LoggerName.DISCORD, LoggerLevel.ERROR, error);
  }
});

interactionCreate(client);

client.login(process.env.DISCORD_TOKEN);
