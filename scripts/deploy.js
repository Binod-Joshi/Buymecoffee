
const hre = require("hardhat");

// 0xB79d72cA1fF23d0709BEf581c4D9696e3379e1fa

async function main() {
  const buyMeCoffeFactory = await hre.ethers.getContractFactory("BuyMeCoffee");
  console.log("deploying.....");
  const buyMeCoffe = await buyMeCoffeFactory.deploy();

  await buyMeCoffe.waitForDeployment();

  console.log(`Deployed contract address : ${buyMeCoffe.target}`);

  // now verification process
  console.log(hre.network.config.chainId);
  if(hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){ // ye lai hadle gaddo baki xa
    console.log("waiting for 6 confirmation");
    await buyMeCoffe.deploymentTransaction().wait(6);
    await verify(buyMeCoffe.target,[]);
  }
}

async function verify(contractAddress,args){
  console.log("verifying contact..");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log("Already Verified");
    }else{
      console.log(error);
    }
  }
}


main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
})
