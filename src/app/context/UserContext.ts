"use client";

import { Dispatch, SetStateAction, createContext } from "react";

/* The `interface UserContextType` is interface that specifies the structure of
the context data that will be stored in the `UserContext`. 
  - `UserId`: string
  - `setUserId`: Dispatch<SetStateAction<string>>
  -  refreshToken: string;
  -  setRefreshToken: Dispatch<SetStateAction<string>>;
*/
interface UserContextType {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: Dispatch<SetStateAction<string>>;
}

/* Creating a context in React using the `createContext` function. The context is named `UserContext` and it has a specific type defined by `UserContextType`.
 */
const UserContext = createContext<UserContextType>({
  userId: "",
  setUserId: () => {},
  refreshToken: "",
  setRefreshToken: () => {},
});

export default UserContext;
