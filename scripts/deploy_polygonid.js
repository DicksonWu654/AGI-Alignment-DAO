const { ethers } = require("hardhat");

async function main() {
    const polygonid_governance = await ethers.getContractFactory("AGIAlignmentDAOPolygonID");
    const PolygonID_Governance = await polygonid_governance.deploy(1, 50);

    console.log("PolygonID_Governance Base Contract deployed to:", PolygonID_Governance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });