import { Client, Interaction } from "discord.js";

import { kills } from "./ranks";

export const interactionCreate = (client: Client) => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "kills") {
      return kills(interaction);
    }
  });
};
