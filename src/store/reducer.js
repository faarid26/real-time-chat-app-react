const chatState = {
  user: null,
};

export default function reducer(state = chatState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "RESET_STATE":
      return chatState;
    default:
      return state;
  }
}
