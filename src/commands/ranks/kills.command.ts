import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  Constants,
} from "discord.js";

import { IKillsRank } from "src/lib/interfaces/ranks";

import { TAdditionalInfo } from "../../types";
import { ICommand } from "../../interfaces";
import { APIPath, interactionReply, rankFormatter } from "../../utils";
import { APIGet } from "../../services";
import { errorHandler } from "../../errors";

const interaction = async (interaction: ChatInputCommandInteraction) => {
  try {
    const kills = await APIGet(APIPath.RanksKills, interaction);

    const additionalInfo: TAdditionalInfo<IKillsRank> = (rankInfo) => {
      return `kills: ${rankInfo.kills}`;
    };

    const killsList = rankFormatter<IKillsRank>(kills!.data, additionalInfo);

    await interactionReply(interaction, killsList);
  } catch (error: any) {
    console.error(`Command Kills`, error);
    errorHandler(interaction, error);
  }
};

export const kill: ICommand = {
  name: "kills",
  description: "Replies with a rank of kills",
  interaction,
  options: [
    {
      name: "match_url",
      description: "Displays the match url",
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
};
