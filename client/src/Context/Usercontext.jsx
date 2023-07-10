import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // on refresh the if the user data disappear then fetch from jwt token
  useEffect(() => {
    try {
      if (!user) {
        axios.get("/profile").then(({ data }) => {
          setUser(data);
          setReady(true);
        });
      }
    } catch (err) {
      console.log("error :", err);
    }
  });
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
