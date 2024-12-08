const { ethers } = require("hardhat");

async function main() {

      // Define initial match keys
      const initialMatchKeys = [
        "NED-USA-3-12-2022", 
        "ARG-AUS-4-12-2022", 
        "FRA-POL-4-12-2022", 
        "JAP-CRO-5-12-2022",
        "ENG-SEN-5-12-2022",
        "BRA-KOR-6-12-2022",
        "ESP-MOR-6-12-2022",
        "POR-SUI-7-12-2022",
    ];

      //Betting contract Deployment
      const betting = await ethers.deployContract("Betting", [initialMatchKeys]);
      await betting.waitForDeployment();
      console.log(
        `Betting contract deployed to ${betting.target}`
      );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
