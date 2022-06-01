import Web3 from "web3";
import Bank from "../truffle_abis/Bank.json";
import TekenToken from "../truffle_abis/TekenToken.json";

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
  const loadData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    console.log("NEssTWORK IDD ", networkId);
  
    //OJO CHECK DEPLOYMENTS EN 2_deploy_contracts (migrations folder)
   //load tekenToken contract
   const tekenData = TekenToken.networks[networkId];
   if (tekenData) {
     const tekenTokenContract = new web3.eth.Contract(TekenToken.abi, tekenData.address);
     console.log("tekenTokenContract ", tekenTokenContract);
     //current balance del usuario conectado en metamask (not owner)
     let tekenBalance = await tekenTokenContract.methods
       .balanceOf(accounts[0])
       .call();
     console.log("tekenBalance",tekenBalance.toString());
   } else {
     alert("Error: TekenToken contract not deployed or not detected network");
   }

    //load BANK contract
    const bankData = Bank.networks[networkId];
    if (bankData) {
      const bankContract = new web3.eth.Contract(Bank.abi, bankData.address);
      console.log("bankContract ", bankContract);
    } else {
      alert("Error: Bank contract not deployed or not detected network");
    }
  };

const loadBlockchainData = async () => {
  await loadWeb3();
  await loadData();
};

export default loadBlockchainData;
