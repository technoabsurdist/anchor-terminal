// terminal app to fetch info with anchor sdk
import { DENOMS, Wallet, MnemonicKey, AnchorEarn, CHAINS, NETWORKS } from '@anchor-protocol/anchor-earn';
import { int } from '@terra-money/terra.js';
import prompt from "prompt"; 
import readline from "readline"; 
import dotenv from "dotenv"; 

// mnemonic key phrase in .env file
dotenv.config(); 
const MEM = process.env.MEM; 
const ADDR = process.env.ADDR; 



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Who are you?', name => {
  console.log(`Hey there ${name}!`);
  readline.close();
});

/* can create accounts with only memmonics */ 
const account = new MnemonicKey({
  mnemonic: MEM,
});

const anchorEarn = new AnchorEarn({
      chain: CHAINS.TERRA,
      network: NETWORKS.COLUMBUS_5,
      mnemonic: MEM,
      address: ADDR,
});

const deposit_function = async (amount) => {
  const deposit = await anchorEarn.deposit({
    currency: DENOMS.UST,
    amount: String(amount), // 12.345 UST or 12345000 uusd
  });

  console.log("Deposited: " + amount)
  console.log("New Balance" + retrieve_balance()); 
  return deposit; 
}

/* Function to withdraw money from main lending account */ 
const withdraw_function = async (amount) => {
  const withdraw = await anchorEarn.withdraw({
    currency: DENOMS.UST,
    amount: String(amount), // 12.345 UST or 12345000 uusd
  });

  console.log("Withdrew: ", amount);
  console.log("New Balance" + retrieve_balance()); 
  return withdraw; 
}


/* takes in 0 parameters and returns account and deposit balance */ 
const retrieve_balance = async () => {
  const balanceInfo = await anchorEarn.balance({
    currencies: [
      DENOMS.UST
    ],
  });

  console.log("Account balance: ", balanceInfo.balances[0].account_balance); 
  console.log("Deposit balance: ", balanceInfo.balances[0].deposit_balance); 
}

/* TODO: user input function -- Not implemented */ 
const mainUserInput = async () => {
  let userInput = ""; 
  prompt.start(); 
  console.log("Functionality: (1) Deposit UST, (2) Withdraw UST, (3) Retrieve Balance"); 
  const res = prompt.get(["input"], function(err, res){
      return res; 
  });
}

/* Main Control Structure -- useless right now*/ 
const actualControlStructure = () => {

  rl.question('(1) Deposit | (2) Withdraw | (3) Balance ?', input => {
    readline.close();
  });
  console.log(input); 


  // retrieve_balance(); 
  deposit_function(0.00004); 
}


/* Main program function */ 
const main = async () => {
  actualControlStructure(); 
}

main(); 
