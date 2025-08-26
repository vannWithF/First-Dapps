import { expect } from "chai";
import { ethers } from "hardhat";
import { DigitalID } from "../typechain-types"; // Gunakan DigitalID berdasarkan error sebelumnya

describe("digitalID", function () {
  let digitalID: DigitalID;
  let owner: any; // Hardhat signer untuk owner
  let addr1: any; // Hardhat signer untuk user lain

  beforeEach(async function () {
    // Ambil signers (akun dari Hardhat)
    [owner, addr1] = await ethers.getSigners();

    // Deploy contract sebelum setiap test
    const DigitalID = await ethers.getContractFactory("digitalID");
    digitalID = await DigitalID.deploy() as DigitalID; // Cast ke tipe DigitalID
  });

  it("Should set and get identity correctly", async function () {
    // Set data KTP untuk owner
    const name = "John Doe";
    const homeAddress = "123 Blockchain St";
    const birthdate = "1990-01-01";
    await digitalID.connect(owner).setIdentity(name, homeAddress, birthdate);

    // Ambil data KTP
    const [retrievedName, retrievedHomeAddress, retrievedBirthdate, exists] = await digitalID.getIdentity(owner.address);

    // Verifikasi data
    expect(retrievedName).to.equal(name);
    expect(retrievedHomeAddress).to.equal(homeAddress);
    expect(retrievedBirthdate).to.equal(birthdate);
    expect(exists).to.be.true;
  });

  it("Should return empty for non-existent identity", async function () {
    // Cek data untuk akun yang belum set identity
    const [name, homeAddress, birthdate, exists] = await digitalID.getIdentity(addr1.address);

    // Verifikasi data kosong
    expect(name).to.equal("");
    expect(homeAddress).to.equal("");
    expect(birthdate).to.equal("");
    expect(exists).to.be.false;
  });

  it("Should emit IdentitySet event", async function () {
    const name = "Jane Doe";
    const homeAddress = "456 Crypto Ave";
    const birthdate = "1995-02-02";

    // Cek apakah event IdentitySet dipancarkan
    await expect(digitalID.connect(owner).setIdentity(name, homeAddress, birthdate))
      .to.emit(digitalID, "IdentitySet")
      .withArgs(owner.address, name, homeAddress, birthdate);
  });
});