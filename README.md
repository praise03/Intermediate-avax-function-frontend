# MetaCrafters Project: Function Frontend
---
**For the Metacrafters, Intermediate Avalanche course on Subnets*

This repository contains a simple smart contract and a front end application written in react which interacts with the smart contract on whichever network it is deployed to

### Description
---
The program is a number guessing game, the contract owner sets the answer at contract beginning and also deposits a bounty of 1 ether which whoever guesses the correct number is going to receive. Users can guess the answer but with a fee of 0.01 ether for each attemp. After the number is successfully guessed, anyone restart the game by supplying 1 ether back to the contract and specifying the number to be guessed. The smart contract owner can also decide to permanently end the game by calling the endGame function.

## Executing the Program


**How to run project**
- Inside the project directory, in the terminal type: yarn or npm install
- Open two additional terminals
- In one terminal type: yarn hardhat node to spin up a local hardhat node for deployment
- In the other terminal, type: yarn hardhat run --network localhost scripts/deploy.js to deploy the contract on the local blockchain node we started above (remember to change the owner address in deploy.js to your address)
- Back in the first terminal, type yarn dev to launch the front-end.


**Interaction**
- Connect your wallet to the app using the connet wallet button
- Input your guess in the input box above the *Guess for 0.01 ETH* button then click the button to submit your guess.
- After correctly guessing the answer you can restart the game using the *restart* button. You have to input the correct answer in the input box above also.
- End the game whenever you want and have the remaining contract balance transferred to your address by clicking the *EndGame* button

**Author:** Disappointed_Rorie **@praise03**

**License**
This project is licensed under the MIT License
