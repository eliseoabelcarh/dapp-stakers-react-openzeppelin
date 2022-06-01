import { createStore } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducers'
import loadBlockchainData from "../services/loadBlockchainData";

const initialState = {
  todos: [
    {
      id: "0",
      name: "go gym",
      complete: false,
    },
    {
        id: "1",
        name: "go laundry",
        complete: false,
      },
      {
        id: "2",
        name: "study",
        complete: false,
      },
  ],
};
 const store = createStore(reducer,initialState,window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_())


 loadBlockchainData()



 export default store