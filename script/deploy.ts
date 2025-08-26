import { ethers } from "hardhat";

async function main() {
  // Ambil factory untuk contract digitalID
  const DigitalID = await ethers.getContractFactory("digitalID");
  
  // Deploy contract
  const digitalID = await DigitalID.deploy();

  // Ambil alamat kontrak
  const contractAddress = await digitalID.getAddress();

  // Cetak alamat kontrak
  console.log("digitalID deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});