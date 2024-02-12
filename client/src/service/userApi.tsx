import axios from "axios";

type dataType = {
  name: string;
  email: string;
  password: string;
};

type formUserLogin = {
  email: string;
  password: string;
};

export const postUser = async (data: dataType) => {
  const { data: user } = await axios.post(
    "http://localhost:3000/api/v1/users/signup",
    data
  );
  return user;
};

export const loginUser = async (data: formUserLogin) => {
  const { data: user } = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    data
  );
  return user;
};
