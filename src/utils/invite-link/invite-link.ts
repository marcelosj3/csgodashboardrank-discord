import dotenv from "dotenv";

dotenv.config();

export const getInviteLink = () => {
  const baseLink = "https://discord.com/api/oauth2/authorize?";

  const clientId = `client_id=${process.env.DISCORD_CLIENT_ID}`;
  const permissions = `permissions=${process.env.DISCORD_PERMISSIONS}`;
  const scope = `scope=${process.env.DISCORD_SCOPE}`;

  const params = [clientId, permissions, scope];

  return baseLink + params.join("&");
};

console.log(getInviteLink());
