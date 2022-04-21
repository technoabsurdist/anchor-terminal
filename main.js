// terminal app to fetch info with anchor sdk
import { DENOMS, Wallet, MnemonicKey, AnchorEarn, CHAINS, NETWORKS } from '@anchor-protocol/anchor-earn';
import { int } from '@terra-money/terra.js';
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

  console.log("Deposited: " + input);
  console.log("New Balance" + retrieve_balance()); 
  return deposit;
}

/* Function to withdraw money from main lending account */ 
const withdraw_function = async (amount) => {
  const withdraw = await anchorEarn.withdraw({
    currency: DENOMS.UST,
    amount: String(amount), // 12.345 UST or 12345000 uusd
  });

  console.log("Withdrew: ", input);
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

  console.log("--------------------------------------------------------")
  console.log("Account balance: ", balanceInfo.balances[0].account_balance); 
  console.log("Deposit balance: ", balanceInfo.balances[0].deposit_balance); 
  console.log("--------------------------------------------------------")
}

/* Main Control Structure -- useless right now*/ 
const actualControlStructure = async () => {

  rl.question('(1) Deposit | (2) Withdraw | (3) Balance | (4) Quit => ', async input => {

    if (int(input) == 1) {
        rl.close(); 
        rl.question("Amount to deposit => ", amount => {
            deposit_function(int(amount)); 
        })
        rl.close(); 

    } else if (int(input) == 2) {
        rl.close(); 
        rl.question("Amount to withdraw => ", amount => {
            withdraw_function(int(amount)); 
        })
        rl.close(); 

    } else if (int(input) == 3) {
        retrieve_balance(); 

    } else if (int(input) == 4) {
      console.log("Bye! Come back soon!");
      return; 

    } else {
      console.log("Not valid input."); 
      actualControlStructure(); 
    }

    rl.close();
  });
}


/* Main program function */ 
const main = async () => {
  actualControlStructure(); 
}

main(); 
