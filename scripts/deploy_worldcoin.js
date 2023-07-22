const { ethers } = require("hardhat");

async function main() {
    const worldcoin_governance = await ethers.getContractFactory("AGIAlignmentDAOWorldcoin");
    const WorldcoinGovernance = await worldcoin_governance.deploy(1, 50, "0x719683F13Eeea7D84fCBa5d7d17Bf82e03E3d260");

    console.log("WorldcoinGovernance Base Contract deployed to:", WorldcoinGovernance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });