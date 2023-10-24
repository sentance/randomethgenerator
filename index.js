const { ethers, utils } = require("ethers");
const fs = require("fs");

const targetAddress = "0x794Fa61f4D51Ef56F6DdF54e4c81B776fDC1813f";

function generateRandomAddress() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

let count = 0;
let generatedAddress;

do {
  generatedAddress = generateRandomAddress();
  count++;
} while (generatedAddress.address !== targetAddress);

console.log("Generated Address:", generatedAddress.address);
console.log("Private Key:", generatedAddress.privateKey);
console.log("Attempts:", count);

// Save private key to a file
fs.writeFileSync("privateKey.txt", JSON.stringify(generatedAddress));

console.log("Private Key saved to privateKey.txt");
