import { createStore } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import loadBlockchainData from "../services/loadBlockchainData";
import loadStakersList from "../services/loadStakersList";
import watchingEvents from "../services/watchingEvents";

import {
  addStakerToListAction,
  cleanStakersList,
  updateBankContractAction,
  updateCurrentStakerAction,
  updateTekenTokenContractAction,
} from "../redux/actions";

const initialState = {
  currentStaker: {
    id: "",
    account: "",
    balance: "",
    symbolToken: "",
    stakingBalance: "",
  },
  stakers: [],
  bankContract: {},
  tekenTokenContract: {},
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



const renderStakerAndStakersList = () => {
    store.dispatch(cleanStakersList());
  loadBlockchainData().then((currentStaker) => {
    store.dispatch(updateCurrentStakerAction(currentStaker));
  });

  loadStakersList().then(
    ({ stakersList, bankContract, tekenTokenContract }) => {
      store.dispatch(updateBankContractAction(bankContract));
      store.dispatch(updateTekenTokenContractAction(tekenTokenContract));
      stakersList.map((staker) => {
        store.dispatch(addStakerToListAction(staker));
      });
    }
  );
};

//inicializo Lista de Stakers
//Get Info for blockchain Contract Data
renderStakerAndStakersList()

watchingEvents().then(({tokensDepositEvent,tokensWithdrawEvent}) => {
  tokensDepositEvent
    .on("data", async function (event) {
      console.log("tokensDepositEvent:", event);
      // event.returnValues
      renderStakerAndStakersList();
    })
    .on("error", console.error);

  tokensWithdrawEvent.on("data", async function (event) {
    console.log("tokensWithdrawEvent:", event);
    renderStakerAndStakersList();
  })
  .on("error", console.error);

});

export default store;
