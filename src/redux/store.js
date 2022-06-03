import { createStore } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import loadBlockchainData from "../services/loadBlockchainData";
import loadStakersList from "../services/loadStakersList";

import {
  addStakerToListAction,
  updateCurrentStakerAction,
} from "../redux/actions";
import { ADD_STAKER_TO_LIST } from "./actions/types";

const initialState = {
  currentStaker: {
    id: "",
    account: "",
    balance: "",
    symbolToken: "",
    stakingBalance: "",
  },
  stakers: [],
};
const store = createStore(
  reducer,
  initialState,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

window.ethereum.on("accountsChanged", function (accounts) {
  // Time to reload your interface with accounts[0]!
  console.log("cHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", accounts[0]);
  //inicializo Lista de Stakers
  //Get Info for blockchain Contract Data
  loadBlockchainData(accounts).then((currentStaker) => {
    store.dispatch(updateCurrentStakerAction(currentStaker));
  });
});
//inicializo Lista de Stakers
//Get Info for blockchain Contract Data
loadBlockchainData().then((currentStaker) => {
  store.dispatch(updateCurrentStakerAction(currentStaker));
});

loadStakersList().then((stakersList) => {
  stakersList.map((staker) => {
    store.dispatch(addStakerToListAction(staker));
  });
});

export default store;
