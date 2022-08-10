import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";

import { ICommand } from "../../interfaces";
import { APIPath, interactionReply } from "../../utils";
import { APIPost } from "../../services";
import { errorHandler } from "../../errors";

const interaction = async (interaction: ChatInputCommandInteraction) => {
  try {
    const urlOption = interaction.options.get("url");

    const data = { url: urlOption!.value as string };

    const matches = await APIPost(APIPath.Matches, interaction, data);

    await interactionReply(interaction, matches?.data);
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
