import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface UserContextType {
  user: unknown;
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
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
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const handleSetUser = (user: unknown) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};
