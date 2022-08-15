import { TAdditionalInfo } from "src/types";

export const rankFormatter = <T extends { name: string }>(
  rankData: T[],
  rankAdditionalInfo?: TAdditionalInfo<T>,
  maxNumber: number = 10
) => {
  if (rankData.length == 0) return `info: "No info added to this rank yet..."`;

  const biggestNameLength = Math.max(
    ...rankData.map((rankInfo) => {
      return rankInfo.name.length;
    })
  );

  return `${rankData
    .slice(0, maxNumber)
    .map((rankInfo: any, index: number) => {
      const rankPosition = `${index + 1 < 10 ? " " : ""}${index + 1}`;

      const nameLengthDiff = biggestNameLength - rankInfo.name.length;
      const name = `${rankInfo.name}${" ".repeat(nameLengthDiff)}`;

      const rankAndName = `${rankPosition} | name: ${name}`;

      const additionalInfo = rankAdditionalInfo
        ? ` - ${rankAdditionalInfo(rankInfo)}`
        : "";

      return `${rankAndName}${additionalInfo}`;
    })
    .join("\n")}`;
};
