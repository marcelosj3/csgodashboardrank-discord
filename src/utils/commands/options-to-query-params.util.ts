import { CacheType, CommandInteractionOption } from "discord.js";

export const optionsToQueryParams = (
  array: (CommandInteractionOption<CacheType> | null)[]
) => {
  return array.filter((option) => option?.value).map((option) => option!.name);
};
