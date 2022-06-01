const TekenToken = artifacts.require("TekenToken");
const Bank = artifacts.require("Bank");

const { assert } = require("chai");

contract("Bank", (accounts) => {
  let bank, tekenToken;
  const creatorOwner = accounts[0];
  const cliente1 = accounts[1];
  const cliente2 = accounts[2];
  before(async () => {
    // creo mi token con initial supply
    tekenToken = await TekenToken.new("5000");
    //creo un banco que usará mi token
    //OJO SE PASA EL ADDRESS DEL TOKEN
    bank = await Bank.new(tekenToken.address);
  });

  describe("Get Initial Supply de creatorOwner", async () => {
    it("balance matches", async () => {
      const balance = await tekenToken.balanceOf(creatorOwner);
      assert.equal("5000", balance.toString());
    });
  });
  describe("Tokens Distribution", async () => {
    it("check all good", async () => {
      //transfiero tekens desde owner a cliente1 - se requiere approve
      const montoPermitido = "1000";
      await tekenToken.approve(cliente1, montoPermitido, {
        from: creatorOwner,
      });
      let permitidoGastar = await tekenToken.allowance(creatorOwner, cliente1);
      console.log("PERTMITIDO GASTAR: ", permitidoGastar.toString());
      let expected = "1000";
      assert.equal(permitidoGastar.toString(), expected);

      //se transfiere del dueño a cliente una parte
      await tekenToken.transfer(cliente1, "400", { from: creatorOwner });
      //checko balances de cliente1
      const balanceCliente = await tekenToken.balanceOf(cliente1);
      expected = "400";
      assert.equal(expected, balanceCliente.toString());
      console.log("BALANCE CLIENTE: ", balanceCliente.toString());
      // el allowance debe ser el mismo que inicial ya que no cambió approve o transferfrom
      //   const diferenciaAllowance = "600"
      const nuevoPermitidoGastar = await tekenToken.allowance(
        creatorOwner,
        cliente1
      );
      console.log("NUEVO PERMITIDO: ", nuevoPermitidoGastar.toString());
      assert.equal(permitidoGastar, nuevoPermitidoGastar.toString());
      //hago que cliente1 stake tokens en bank - requiere approve a bank
      await tekenToken.approve(bank.address, "300", { from: cliente1 });
      await bank.depositTokens("300", { from: cliente1 });
      //cheko si cliente1 esta staking y cuanto en bank
      const isStaking = await bank.isStaking(cliente1);
      assert.equal(true, isStaking);
      const stakingBalance = await bank.stakingBalance(cliente1);
      assert.equal("300", stakingBalance.toString());
    });
  });
});
