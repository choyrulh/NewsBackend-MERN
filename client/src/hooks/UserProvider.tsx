import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { userAuthType } from "../type/userAuthType";

interface UserContextType {
  user: userAuthType | null;
  setUser: (user: userAuthType | null) => void;
}

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUserLogin = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<userAuthType | null>(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie && !user) {
      setUser(JSON.parse(userCookie));
    }
  }, [user]);

  const handleSetUser = (newUser: userAuthType | null) => {
    setUser(newUser);
    // Set or remove the user cookie based on the newUser value
    if (newUser) {
      Cookies.set("user", JSON.stringify(newUser));
    } else {
      Cookies.remove("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};
