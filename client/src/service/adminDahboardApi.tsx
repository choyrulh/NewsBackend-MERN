import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

export const getAllUser = async () => {
  const jwtToken = Cookies.get("jwt");
  if (!jwtToken) {
    console.log("JWT token not found in cookies");
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/api/v1/users", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
