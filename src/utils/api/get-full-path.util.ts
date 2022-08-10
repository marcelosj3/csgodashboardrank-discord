import { APIPath } from "src/enums";

export const getFullPath = (path: APIPath, queryParams?: string[]) =>
  String(path) + (queryParams ? `?${queryParams.join("&")}` : "");
