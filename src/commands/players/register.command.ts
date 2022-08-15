import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";

import { ICommand } from "../../interfaces";
import { interactionReply, playerInfoToEmbed } from "../../utils";
import { errorHandler } from "../../errors";
import { APIPath } from "../../enums";
import { API } from "../../services";
import { IPlayerSerializer } from "src/lib/interfaces/serializers";

// TODO change this when implementing payload handle in the API
interface IPayload {
  url: string;
}

const interaction = async (interaction: ChatInputCommandInteraction) => {
  try {
    await interaction.reply(
      "Sending players url and waiting for the request..."
    );

    const urlOption = interaction.options.get("url");

    const data: IPayload = { url: urlOption!.value as string };

    await interaction.editReply("Fetching player data from the website...");

    const players = await API.post<IPayload>(
      APIPath.Players,
      interaction,
      data
    );

    const playerInfo: IPlayerSerializer = players?.data;

    if (playerInfo) {
      await interaction.editReply(
        "Player data fetched from the application..."
      );

      const response = playerInfoToEmbed(playerInfo);

      await interactionReply(interaction, response, "embed");
      await interaction.editReply("Added player successfully.");
    }
  } catch (error: any) {
    errorHandler(interaction, error);
  }
};

export const playerRegister: ICommand = {
  name: "player-register",
  description: "Register a player URL into the application.",
  interaction,
  options: [
    {
      name: "url",
      description: "Url of the player to be registered.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
};
