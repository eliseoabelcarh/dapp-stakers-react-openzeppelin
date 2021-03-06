// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./TekenToken.sol";

contract Bank {
    string public name = "Bank";
    address public owner;
    TekenToken public tekenToken;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    event TokensDepositEvent(address indexed _staker);
    event TokensWithdrawEvent(address indexed _staker);

    constructor(TekenToken _tekenToken) {
        tekenToken = _tekenToken;
        owner = msg.sender;
    }

    // staking function
    function depositTokens(uint256 _amount) public {
        // require staking amount to be greater than zero
        require(_amount > 0, "amount cannot be 0");
        // Transfer tekenToken tokens to this contract address for staking
        tekenToken.transferFrom(msg.sender, address(this), _amount);
        // Update Staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // Update Staking Balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

        emit TokensDepositEvent(msg.sender);
    }

    function totalStakers() public view returns (uint256) {
        return stakers.length;
    }

    // unstake tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        // require the amount to be greater than zero
        require(balance > 0, "staking balance cannot be less than zero");
        // transfer the tokens to the specified contract address from our bank
        tekenToken.transfer(msg.sender, balance);
        // reset staking balance
        stakingBalance[msg.sender] = 0;
        // Update Staking Status
        isStaking[msg.sender] = false;

        emit TokensWithdrawEvent(msg.sender);
    }
}
