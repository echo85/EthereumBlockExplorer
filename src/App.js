import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {Route, Switch, Link } from "react-router-dom";
import TransactionDetail from './TransactionDetail';
import Transactions from './Transactions';
import Account from './Account';
import './App.css';

function App() {
  
  return(
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/balance">Check Balance</Link>
      </nav>
    <Switch>
        <Route exact path="/">
          <Transactions />
        </Route>
        <Route path="/transactions/:transactionId">
          <TransactionDetail />
        </Route>
        <Route path="/balance">
          <Account />
        </Route>
      </Switch>
    
     </div>
  );
}

export default App;
