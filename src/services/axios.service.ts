import axios from "axios";

export const API = axios.create({
  baseURL: "https://csgo-dashboard-rank.herokuapp.com/api/",
});
