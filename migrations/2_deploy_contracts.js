var TekenToken = artifacts.require("./TekenToken.sol");
var Bank = artifacts.require("./Bank.sol");

module.exports = async function (deployer, network, accounts) {
  const initialSupply = (100 * 10 ** 18).toString();
  const initialCliente = (40 * 10 ** 18).toString();
  const initialStakeDeCliente1 = (30 * 10 ** 18).toString();
  const initialStakeDeCliente2 = (20 * 10 ** 18).toString();

  await deployer.deploy(TekenToken, initialSupply);
  const tekenToken = await TekenToken.deployed();

  await deployer.deploy(Bank, tekenToken.address);
  const bank = await Bank.deployed();

  //distribute 100 Teken tokens to investors
//CLIENTE1
  console.log("Account1 Cliente1: ", accounts[1]);
  await tekenToken.transfer(accounts[1], initialCliente);
  const balanceCliente = await tekenToken.balanceOf(accounts[1]);
  console.log("BALANCE CLIENTEE1: ", balanceCliente.toString());
  //CLIENTE2
  console.log("Account1 Cliente2: ", accounts[2]);
  await tekenToken.transfer(accounts[2], initialCliente);
  const balanceCliente2 = await tekenToken.balanceOf(accounts[2]);
  console.log("BALANCE CLIENTEE2: ", balanceCliente2.toString());


  // onwer se queda con menos cantidad
  console.log("Account ONWERRR: ", accounts[0]);
  const balanceOwner = await tekenToken.balanceOf(accounts[0]);
  console.log("BALANCE ONWERRR: ", balanceOwner.toString());
  //console.log("numero:  ", (100*10**18).toString())

  // cliente1 hace stake en bank
  await tekenToken.approve(bank.address, initialStakeDeCliente1, {
    from: accounts[1],
  });
  await bank.depositTokens(initialStakeDeCliente1, { from: accounts[1] });
  // cliente2 hace stake en bank
  await tekenToken.approve(bank.address, initialStakeDeCliente2, {
    from: accounts[2],
  });
  await bank.depositTokens(initialStakeDeCliente2, { from: accounts[2] });


  //chekeo si hay stakers 
  const isStaking = await bank.isStaking(accounts[1]);
  console.log("isStaking?: ", isStaking);
  // tira error REVERT si el nro de index es inexistente
  const staker = await bank.stakers(0);
  console.log("staker: ", staker);
  const stakersCant = await bank.totalStakers()
  console.log("stakersCant: ",stakersCant.toString());
};
