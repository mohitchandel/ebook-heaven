"use client";

import { Dispatch, SetStateAction, createContext } from "react";

interface UserContextType {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContextType>({
  userId: "",
  setUserId: () => {},
  refreshToken: "",
  setRefreshToken: () => {},
});

export default UserContext;
