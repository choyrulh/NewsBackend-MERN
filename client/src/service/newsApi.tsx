import axios from "axios";

export const fetchNews = async () => {
  const { data } = (await axios.get("http://localhost:3000/api/v1/news")).data;
  return data;
};
