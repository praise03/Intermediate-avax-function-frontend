import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/GuessingGame.sol/NumberGuessingGame.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [guessingGame, setGuessingGame] = useState(undefined);
  const [contractBalance, setContractBalance] = useState(undefined);
  const [guess, setGuess] = useState('');
  const [newAnswer, setNewAnswer] = useState('')

  const contractAddress = "0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8";
  const abi = contractABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getGameContract();
  };

  const getGameContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(contractAddress, abi, signer);

    setGuessingGame(gameContract);
  }

  const getBalance = async () => {
    if (guessingGame) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const contractBalance = (await provider.getBalance(guessingGame.address)).toString()
      setContractBalance(contractBalance / 10 ** 18);
      // for (let index = 0; index < count; index++) {
      //     getWinners(index); 
      // }
      // setContractBalance()
      // setContractBalance(ethers.utils.parseUnits(await provider.getBalance(guessingGame.address)).toString());
    }
  }

 
  const guessNumber = async () => {
    if (guessingGame) {
      let tx = await guessingGame.guess(guess, { value: ethers.utils.parseEther("0.01") });
      await tx.wait()
      getBalance();
    }
  }

  const restart = async() => {
    if (guessingGame) {
      let tx = await guessingGame.restart(newAnswer, {value: ethers.utils.parseEther("1")});
      await tx.wait()
      getBalance();
    }
  }

  const endGame = async () => {
    if (guessingGame) {
      let tx = await guessingGame.endGame();
      await tx.wait();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (contractBalance == undefined) {
      getBalance();
    }

    return (
      <div style={{ backgroundColor: "black" }}>
        <p>Connected Account: {account}</p>
        <p>Contract Balance: {contractBalance}</p>
        <input value={guess}
          onChange={(event) => {
            setGuess(event.target.value);
          }}></input>
        <button onClick={guessNumber}>Guess for 0.01 ETH</button>
        <br /><br />

        <input value={newAnswer} onChange={(e) => {
          setNewAnswer(e.target.value)
        } } />
        <button onClick={restart}>Restart Game</button>

        <br/>
        <button onClick={endGame}>End Game</button>
      </div>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Number Guessing Game</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          color: white;
          background-color: black;
          padding: 100px;
        }
      `}
      </style>
    </main>
  )
}
