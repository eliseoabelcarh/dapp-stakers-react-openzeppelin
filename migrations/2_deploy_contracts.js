var TekenToken = artifacts.require("./TekenToken.sol");
var Bank = artifacts.require("./Bank.sol")

module.exports =async function(deployer) {
 await deployer.deploy(TekenToken, "1000000000000000000000");
 const tekenToken = await TekenToken.deployed()
  await deployer.deploy(Bank, tekenToken.address)
};
