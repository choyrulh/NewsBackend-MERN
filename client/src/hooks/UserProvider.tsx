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
  const [user, setUser] = useState<userAuthType | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const handleSetUser = (user: userAuthType | null) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};
