// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract NumberGuessingGame {
    uint8 private answer;
    uint256 public bounty = 1 ether;
    uint8 gameEnded;
    address[] public winners;
    address owner;
    

    constructor(uint8 number, address _owner) payable {
        require(msg.value >= 1 ether);
        answer = number;
        owner = _owner;
    }

    //Player can participate by paying 1 ether and take a guess
    function guess(uint8 number) external payable returns(uint8) {
        require(gameEnded == 0,"The Current Game Has Ended!");
        require(
            msg.value >= 0.01 ether,
            "You have to pay 0.01 ether to play the game"
        );
        if (number == answer) {
            winners.push(msg.sender);
            payable(msg.sender).transfer(bounty);
            gameEnded = 1;
        }
        return gameEnded;
    }

    function restart(uint8 _answer) external payable {
        require(gameEnded == 1, "A game is still in progress");
        require(msg.value == 1 ether, "Not Enough ETHER sent");
        gameEnded = 0;
        answer = _answer;
    }

    function endGame() public {
        require(msg.sender == owner, "You are not the contract owner");
        selfdestruct(payable(owner));
    }
}
