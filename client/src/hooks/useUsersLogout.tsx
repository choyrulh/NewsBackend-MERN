import axios from "axios";
import Cookies from "js-cookie";

function useUsersLogout() {
  const handleLogout = () => {
    axios
      .post("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        Cookies.remove("user"); // Menghapus cookie 'user'
      });
  };

  return { handleLogout };
}

export default useUsersLogout;
