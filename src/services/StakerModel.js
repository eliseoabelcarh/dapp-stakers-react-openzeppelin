const StakerModel = {
  reduceHashTransaction : (str)=> {
    var result = "";
    if (str.length >= 40) {
      result = ` ${str.substring(0, 7)}... ${str.slice(-6)}`;
    }else{
      result = "too little characters"
    }
    return result;
  },
  reduceWallet: (str) => {
    var result = "";
    if (str.length >= 40) {
      result = ` ${str.substring(0, 2)}... ${str.slice(-4)}`;
    }else{
      result = "too little characters"
    }
    return result;
  },
  fromWei: (amount) => window.web3.utils.fromWei(amount, "Ether"),
  toWei: (amount) => window.web3.utils.toWei(amount, "Ether"),
  createModelStaker: ({ id, account, stakingBalance, symbolTokenStaked }) => {
    if (!id) {
      throw Error("no hay id recibido");
    }
    if (!account) {
      throw Error("no hay account recibido");
    }
    if (!stakingBalance) {
      throw Error("no hay stakingBalanceEE recibido");
    }
    if (!symbolTokenStaked) {
      throw Error("no hay symbolTokenStaked recibido");
    }
    
    let inEth = StakerModel.fromWei(stakingBalance);
    return {
      id,
      account: account,
      stakingBalance: inEth,
      symbolTokenStaked,
    };
  },
  createModelAccount: ({
    id,
    account,
    balance,
    symbolToken,
    stakingBalance,
  }) => {
    if (!id) {
      throw Error("no hay id recibido");
    }
    if (!account) {
      throw Error("no hay account recibido");
    }
    if (!balance) {
      throw Error("no hay balance recibido");
    }
    if (!symbolToken) {
      throw Error("no hay symbolToken recibido");
    }
    if (!stakingBalance) {
      throw Error("no hay stakingBalance recibido");
    }
    
    let inEthBalance = StakerModel.fromWei(balance);
    let inEthStakingBalance = StakerModel.fromWei(stakingBalance);
    return {
      id,
      account: account,
      balance: inEthBalance,
      symbolToken,
      stakingBalance: inEthStakingBalance,
    };
  },
};
export default StakerModel;
