import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";

import { IRanksKills } from "../../lib/interfaces/ranks";
import { QueryParam } from "../../lib/enums";

import { TAdditionalInfo } from "../../types";
import { ICommand, IOptionInfo } from "../../interfaces";
import {
  interactionReply,
  optionsToAdditionalInfo,
  optionsToQueryParams,
  rankFormatter,
} from "../../utils";
import { API } from "../../services";
import { errorHandler } from "../../errors";
import { APIPath } from "../../enums";

const interaction = async (interaction: ChatInputCommandInteraction) => {
  try {
    await interaction.reply("Fetching kills rank...");
    const matchUrlOption = interaction.options.get(QueryParam.MATCH_URL);

    const optionArray = [matchUrlOption];
    const options = optionsToQueryParams(optionArray);

    const kills = await API.get(APIPath.RanksKills, interaction, options);

    const additionalInfo: TAdditionalInfo<IRanksKills> = (rankInfo) => {
      const kills = `kills: ${rankInfo.kills}`;

      const optionsInfo: IOptionInfo = {
        match_url: `matchUrl: "${rankInfo.matchUrl}"`,
      };

      const essential: string[] = [kills];
      const additional: string[] = optionsToAdditionalInfo(
        options,
        optionsInfo
      );

      return [...essential, ...additional].join(" - ");
    };

    const response = rankFormatter<IRanksKills>(kills?.data, additionalInfo);

    await interactionReply(interaction, response);
  } catch (error: any) {
    errorHandler(interaction, error);
  }
};

export const kill: ICommand = {
  name: "kills",
  description: "Replies with a rank of kills",
  interaction,
  options: [
    {
      name: QueryParam.MATCH_URL,
      description: "Displays the match url",
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
    {
      name: QueryParam.DUPLICATES,
      description: "Includes duplicates of the players",
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
    {
      name: QueryParam.REVERSED,
      description: "Shows the reversed values of the list",
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
    {
      name: QueryParam.SORT_BY,
      description: "Shows the reversed values of the list",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
};
