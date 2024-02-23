import { useState, useEffect } from "react";
import abi from "./contractJson/BuyMeCoffee.json";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  
  useEffect(() => {
    const template = async () => {
      const contractAddres = "0xB79d72cA1fF23d0709BEf581c4D9696e3379e1fa";
      const contractABI = abi.abi;
      //Metamask part
      //1. In order do transactions on sepolia testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try {
        const { ethereum } = window;
        console.log(ethereum);
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(account);

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);
        const provider = new ethers.BrowserProvider(ethereum); //read the Blockchain
        console.log(provider);
        const signer = await provider.getSigner(); //write the blockchain
        console.log(signer);

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.error(error);
        console.log(error);
      }
    };
    template();
  }, []);

  return (
    <div>
      <div className="app">
        <div>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Connected Account:
            </span>
          </p>
          <p style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>{" "} 
            {account[0]}
            </p>
            
          <Buy state={state}></Buy>
        </div>
        <div>
          <Memos state={state}></Memos>
        </div>
      </div>
    </div>
  );
}

export default App;

// const contractAddress = "0xB79d72cA1fF23d0709BEf581c4D9696e3379e1fa";
