import axios from "axios";

export const fetchNews = async () => {
  const { data } = (await axios.get("http://localhost:3000/api/v1/news")).data;
  return data;
};

export const fetchDetailNews = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/v1/news/${id}`);
  return data;
};

export const fetchNewsByQuery = async (query: string) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/v1/news/query?search=${query}`
  );
  return data;
};
