import { UPDATE_MODAL_MESSAGE,RESET_MODAL_MESSAGE } from "../constants";
const initialState = {
    messageType:"",
    message:""
};

const modalMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODAL_MESSAGE:
      return {
        ...state,
        messageType:action.data.messageType,
        message:action.data.message
      };
    case RESET_MODAL_MESSAGE:
        return initialState
    default:
      return state;
  }
};

export default modalMessageReducer;