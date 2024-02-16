// import axios from "axios";
// import { useEffect, useState } from "react";
// import { userAuthType } from "../type/userAuthType";

// axios.defaults.withCredentials = true;

// const useUserLogin = () => {
//   const [user, setUser] = useState<userAuthType | null>(null);

//   const sendReq = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/api/v1/users/login/user",
//         {
//           withCredentials: true,
//         }
//       );
//       if (res.status === 200) {
//         setUser(res.data.data);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     sendReq();
//   }, []);

//   console.log(user);

//   return {
//     user,
//   };
// };

// export default useUserLogin;
