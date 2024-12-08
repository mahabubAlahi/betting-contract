const { ethers } = require("hardhat");

async function main() {

    const betting = await ethers.getContractAt("Betting", "0x9d16E59D5cBB0c46A88E63b2f39595834b30D596");
    console.log(await betting.hasPlacedBet('0x914E8B27B7B6D1A33f099f7525e9720B0B682D6A', 'ARG-AUS-4-12-2022'));

    // Convert ETH value to Wei
    const valueInWei = ethers.parseEther('1');

    const placeBet = await betting.placeBet('0x914E8B27B7B6D1A33f099f7525e9720B0B682D6A','ARG-AUS-4-12-2022', {
        value: valueInWei
    });

    await placeBet.wait();

    console.log(await betting.hasPlacedBet('0x914E8B27B7B6D1A33f099f7525e9720B0B682D6A', 'ARG-AUS-4-12-2022'));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});