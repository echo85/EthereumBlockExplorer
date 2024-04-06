import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
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

function Transactions() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockTransactions, setBlockTransactions] = useState();
  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getTransactionsFromLastBlock() {
      let block = await alchemy.core.getBlockNumber();
      var result = await alchemy.core.getBlock(block);
      
      const listItems = result.transactions.map(transaction => <li key={`${transaction}`}><Link to={`/transactions/${transaction}`}>{transaction}</Link></li>);
      setBlockTransactions(listItems);
    }

    getBlockNumber();
    getTransactionsFromLastBlock();
  });

  return(
    <div className="App">
     <h1>Block Number: {blockNumber}</h1>
     <div>Block Transactions: <ul>{blockTransactions}</ul></div>
     </div>
  );
}

export default Transactions;
