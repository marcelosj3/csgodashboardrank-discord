import { CacheType, CommandInteractionOption } from "discord.js";

export const optionsToQueryParams = (
  array: (CommandInteractionOption<CacheType> | null)[]
) => {
  return array
    .filter((option) => option?.value)
    .map((option) => {
      if (typeof option?.value === "string")
        return `${option!.name}=${option?.value}`;

      return option!.name;
    });
};
