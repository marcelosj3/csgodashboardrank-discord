import { IOptionInfo } from "src/interfaces";

export const optionsToAdditionalInfo = (
  options: string[],
  optionsInfo: IOptionInfo
) => {
  const additional: string[] = [];

  options.forEach((option: string) => {
    if (optionsInfo[option]) {
      additional.push(optionsInfo[option]);
    }
  });

  return additional;
};
