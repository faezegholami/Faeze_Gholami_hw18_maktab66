import React, { createContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isSignin, setIsSignin] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isSignin, setIsSignin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
