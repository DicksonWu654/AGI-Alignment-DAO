const { ethers } = require("hardhat");

async function main() {
    const base_governance = await ethers.getContractFactory("AGIAlignmentDAO");
    const Governance = await base_governance.deploy(1, 50);

    console.log("AGIAlignmentDAO Base Contract deployed to:", Governance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });