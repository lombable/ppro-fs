import { useReducer } from "react";
import { UserContext } from "./UserContext";
import { userReducer } from "./userReducer";

const INITIAL_STATE = {
  userInfo: null
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setUserInfo = (userInfo) => {
    dispatch({
      type: "setUserInfo",
      payload: userInfo,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        // Methods
        setUserInfo
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
