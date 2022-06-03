import Web3 from "web3";
import Bank from "../truffle_abis/Bank.json";
import TekenToken from "../truffle_abis/TekenToken.json";


const loadEvent = async () => {
  let bankContract;
  let tokensDepositEvent;
  let tokensWithdrawEvent

  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();

  //load BANK contract
  const bankData = Bank.networks[networkId];
  if (bankData) {
    bankContract = new web3.eth.Contract(Bank.abi, bankData.address);
    tokensDepositEvent = bankContract.events.TokensDepositEvent({});
    tokensWithdrawEvent = bankContract.events.TokensWithdrawEvent({});
  } else {
    alert("Error: Bank contract not deployed or not detected network");
  }

  return {tokensDepositEvent,tokensWithdrawEvent};
};

const watchingEvents = async () => {
  return await loadEvent();
};

export default watchingEvents;
