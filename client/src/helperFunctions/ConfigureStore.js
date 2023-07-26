import { configureStore} from '@reduxjs/toolkit'
import rootReducer from "../redux/reducers/index";
import thunk from "redux-thunk";
export default function configureAppStore() {
    const store = configureStore({
      reducer: rootReducer,
      middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    })  
    return store
  }