import { useState } from "react";
import UserContext from "@/app/context/UserContext";

const UserContextProvider = ({ children }: { children: any }) => {
  const [userId, setUserId] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId: setUserId,
        refreshToken,
        setRefreshToken: setRefreshToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
