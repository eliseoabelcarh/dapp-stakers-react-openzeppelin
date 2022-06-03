import Web3 from "web3";
import Bank from "../truffle_abis/Bank.json";
import TekenToken from "../truffle_abis/TekenToken.json";
import StakerModel from "./StakerModel";

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert("no ethereum browser detected, check out metamask ");
  }
};
const loadData = async (currentReloadAccountAddress) => {
  let currentStaker = {};
  let symbolTekenToken;
  let tekenBalance;
  let currentUserAccountAddress = null;
  let currentStakingBalance;

  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  console.log("NEssTWORK IDD ", networkId);

  //OJO CHECK DEPLOYMENTS EN 2_deploy_contracts (migrations folder)
  //load tekenToken contract
  const tekenData = TekenToken.networks[networkId];
  if (tekenData) {
    const tekenTokenContract = new web3.eth.Contract(
      TekenToken.abi,
      tekenData.address
    );
    console.log("tekenTokenContract ", tekenTokenContract);
    //current balance del usuario conectado en metamask (not owner)
    //
    if (!currentUserAccountAddress && !currentReloadAccountAddress) {
      currentUserAccountAddress = accounts[0];
    } else {
      currentUserAccountAddress = currentReloadAccountAddress;
    }
    console.log("MY ADDRESSSSSSSSSSSSS", accounts);
    tekenBalance = await tekenTokenContract.methods
      .balanceOf(currentUserAccountAddress)
      .call();
    console.log("tekenBalance", tekenBalance.toString());
    symbolTekenToken = await tekenTokenContract.methods.symbol().call();
    console.log("symbolTekenToken ", symbolTekenToken);
  } else {
    alert("Error: TekenToken contract not deployed or not detected network");
  }

  //load BANK contract
  const bankData = Bank.networks[networkId];
  if (bankData) {
    const bankContract = new web3.eth.Contract(Bank.abi, bankData.address);
    console.log("bankContract ", bankContract);

    //CHECK FOR CURRENT STAKER INFO
    currentStakingBalance = await bankContract.methods
      .stakingBalance(currentUserAccountAddress)
      .call();
    currentStaker = StakerModel.createModelAccount({
      id: currentUserAccountAddress,
      account: currentUserAccountAddress,
      balance: tekenBalance,
      symbolToken: symbolTekenToken,
      stakingBalance: currentStakingBalance,
    });
  } else {
    alert("Error: Bank contract not deployed or not detected network");
  }

  return currentStaker;
};

const loadBlockchainData = async () => {
  await loadWeb3();
  return await loadData();
};

export default loadBlockchainData;
