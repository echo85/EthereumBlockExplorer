import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useRef, useState } from 'react';
import { Link } from "react-router-dom";

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function Account() {
  const [balance, setBalance] = useState('0');
  const inputRef = useRef(null);

    async function getBalance(address) {
        var balance = await alchemy.core.getBalance(address, "latest");
        const formatedBalance = Utils.formatUnits(balance, "ether"); 
 
        setBalance(formatedBalance);
    }

    const handleClick = () => {
        // 👇 "message" stores input field value
        getBalance(inputRef.current.value);
      };
   


  return(
    <div className="App">
     <h1>Account</h1>
     <div>Insert your Public Address: <input type="text" ref={inputRef} placeholder="Enter a wallet address" /></div>
     <br />
     <button onClick={handleClick}>Check balance</button>
     <br />  <br />
     Balance: {balance} ETH
     </div>
  );
}

export default Account;
