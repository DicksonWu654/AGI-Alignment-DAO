const { ethers } = require("hardhat");

async function main() {
    const final_governance = await ethers.getContractFactory("AGIAlignmentDAOFinal");
    const FinalGovernance = await final_governance.deploy(1, 50);

    console.log("FinalGovernance Contract deployed to:", FinalGovernance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });