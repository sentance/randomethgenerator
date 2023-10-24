const { ethers } = require("ethers");
const fs = require("fs");

const infuraProjectId = "cdf7186f13d1472590e00476c7a5746c";
const targetBalance = ethers.parseEther("0.0001"); // 0.0001 ETH in Wei

function generateRandomAddress() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

(async () => {
  let generatedAddress;
  let balance = ethers.getBigInt(0);

  while (1 > 0) {
    generatedAddress = generateRandomAddress();
    const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraProjectId}`);
    balance = await provider.getBalance(generatedAddress.address);

    console.log("Generated Address:", generatedAddress.address);
    console.log("Private Key:", generatedAddress.privateKey);
    console.log("Balance:", ethers.formatEther(balance));

    if (balance >= targetBalance) {
      // Save private key and address to files if balance is greater than or equal to 0.0001 ETH
      fs.appendFileSync("privateKey.txt", generatedAddress.privateKey + "\n");
      fs.appendFileSync("address.txt", generatedAddress.address + "\n");
      console.log("Address and Private Key saved to files.");
    } else {
      console.log("Balance is less than 0.0001 ETH. Generating a new address...");
    }
  }
})();
