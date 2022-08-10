import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";

import { IKillsRank } from "src/lib/interfaces/ranks";

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
import { KillsQueryParams } from "../../enums/api/query-params";
import { APIPath } from "../../enums";

const interaction = async (interaction: ChatInputCommandInteraction) => {
  console.log("oi");
  try {
    await interaction.reply("Fetching kills rank...");
    const matchUrlOption = interaction.options.get(KillsQueryParams.MATCH_URL);

    const optionArray = [matchUrlOption];
    const options = optionsToQueryParams(optionArray);

    const kills = await API.get(APIPath.RanksKills, interaction, options);

    const additionalInfo: TAdditionalInfo<IKillsRank> = (rankInfo) => {
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

    const response = rankFormatter<IKillsRank>(kills!.data, additionalInfo);

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
      name: KillsQueryParams.MATCH_URL,
      description: "Displays the match url",
      required: false,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
};
