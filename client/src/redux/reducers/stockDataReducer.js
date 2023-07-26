import { UPDATE_STOCK_DATA, RESET_STOCK_DATA } from "../constants";
const initialState = {
  stockData: {},
};

const stockDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STOCK_DATA:
      return {
        ...state,
        stockData: action.data,
      };
    case RESET_STOCK_DATA:
      return initialState;
    default:
      return state;
  }
};

export default stockDataReducer;