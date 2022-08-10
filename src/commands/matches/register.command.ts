import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";

import { ICommand } from "../../interfaces";
import { interactionReply, matchInfoToString } from "../../utils";
import { errorHandler } from "../../errors";
import { APIPath } from "../../enums";
import { API } from "../../services";
import { IMatchDetails } from "src/lib/interfaces/matches";

// TODO change this when implementing payload handle in the API
interface IPayload {
  url: string;
}

const interaction = async (interaction: ChatInputCommandInteraction) => {
  try {
    await interaction.reply("Fetching match data...");
    const urlOption = interaction.options.get("url");

    const data: IPayload = { url: urlOption!.value as string };

    const matches = await API.post<IPayload>(
      APIPath.Matches,
      interaction,
      data
    );

    const matchInfo: IMatchDetails = matches?.data;

    if (matchInfo) {
      const response = matchInfoToString(matchInfo);

      await interactionReply(interaction, response);
    }
  } catch (error: any) {
    errorHandler(interaction, error);
  }
};

export const matchRegister: ICommand = {
  name: "match-register",
  description: "Register a match URL into the application.",
  interaction,
  options: [
    {
      name: "url",
      description: "Url of the match to be registered.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
};
