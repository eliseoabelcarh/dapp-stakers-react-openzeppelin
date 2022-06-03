import Web3 from "web3";
import Bank from "../truffle_abis/Bank.json";
import TekenToken from "../truffle_abis/TekenToken.json";
import StakerModel from "./StakerModel";



const loadDataStakersList = async () => {
    let stakersList = [];
  let symbolTekenToken;

  let tekenTokenContract
  let bankContract


  const web3 = window.web3;
  //const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  console.log("NEssTWORK IDD ", networkId);

   //OJO CHECK DEPLOYMENTS EN 2_deploy_contracts (migrations folder)
  //load tekenToken contract
  const tekenData = TekenToken.networks[networkId];
  if (tekenData) {
     tekenTokenContract = new web3.eth.Contract(
      TekenToken.abi,
      tekenData.address
    );
    symbolTekenToken = await tekenTokenContract.methods.symbol().call();
  } else {
    alert("Error: TekenToken contract not deployed or not detected network");
  }

  //load BANK contract
  const bankData = Bank.networks[networkId];
  if (bankData) {
     bankContract = new web3.eth.Contract(Bank.abi, bankData.address);
    console.log("bankContract ", bankContract);

    //CHECK FOR STAKERS LIST
    let cantidadDeStakers = await bankContract.methods.totalStakers().call();
    console.log("cantidadDeStakers  ", cantidadDeStakers.toString());
    for (let i = 0; i < cantidadDeStakers; i++) {
      let stakerAddress = await bankContract.methods.stakers(i).call();
      let stakingBalance = await bankContract.methods
        .stakingBalance(stakerAddress)
        .call();
      let show = `${stakerAddress} ::: ${stakingBalance}`;
      console.log("cliente1:", show);
      const modelStaker = StakerModel.createModelStaker({
        id: stakerAddress,
        account: stakerAddress,
        stakingBalance: stakingBalance,
        symbolTokenStaked: symbolTekenToken,
      });
      stakersList.push(modelStaker);
    }
    
  } else {
    alert("Error: Bank contract not deployed or not detected network");
  }
return {stakersList, bankContract, tekenTokenContract}
};

const loadStakersList = async () => {
 return await loadDataStakersList();
};

export default loadStakersList;
