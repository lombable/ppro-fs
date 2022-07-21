export const userReducer = (state, action) => {
  switch (action.type) {
    case "setUserInfo":
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
};
