import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {useParams, Link} from "react-router-dom"
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

function TransactionDetail() {
  const {transactionId} = useParams()
  const [transactionDetails, setTransactionDetails] = useState();
  useEffect(() => {
    async function getTransactionDetails(transactionId) {
       
      var result = await alchemy.core.getTransactionReceipt(transactionId);
      setTransactionDetails(result);
    }

    getTransactionDetails(transactionId);
  });

  if(transactionDetails) {
   const gasUsed = Utils.formatUnits(transactionDetails.gasUsed, "ether"); 
   const effectiveGasPrice = Utils.formatUnits(transactionDetails.effectiveGasPrice, "ether"); 
  return(
    <div className="App">
   
     <h1>TransactionDetail: {transactionDetails.transactionHash}</h1>
     <div>
        <strong>From:</strong> {transactionDetails.from} <br />
        <strong>To:</strong> {transactionDetails.to}<br />
        <strong>Gas Used:</strong> {gasUsed} ETH<br />
        <strong>Effective Gas Price:</strong> {effectiveGasPrice} ETH
      
     </div>
     <br /> <br />
     <div><Link to="/">Back to list of transactions</Link></div>
  
     </div>
  );
    }
    else {
        return null;
    }
}

export default TransactionDetail;
