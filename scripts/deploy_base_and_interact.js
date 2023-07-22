const { ethers } = require("hardhat");

async function main() {
    const base_governance = await ethers.getContractFactory("AGIAlignmentDAO");
    const Governance = await base_governance.deploy(1, 50);
    await Governance.deployed();
    console.log("AGIAlignmentDAO Base Contract deployed to:", Governance.address);

    const verify_ones_self = await Governance.verifyHuman();
    await verify_ones_self.wait();
    console.log("verify_ones_self", verify_ones_self);

    const add_proposal = await Governance.createProposal("The AGI Must follow: All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.")
    await add_proposal.wait();
    console.log("add_proposal", add_proposal);

    const vote_on_proposal = await Governance.vote(0, 1);
    await vote_on_proposal.wait();
    console.log("vote_on_proposal", vote_on_proposal);

    const check_proposal = await Governance.checkProposal(0)
    await check_proposal.wait();
    console.log("check_proposal", check_proposal);

    const add_proposal_2 = await Governance.createProposal("The AGI Must follow: Everyone has the right to life, liberty and security of person")
    await add_proposal_2.wait();
    console.log("add_proposal_2", add_proposal_2);

    const vote_on_proposal_2 = await Governance.vote(1, 1);
    await vote_on_proposal_2.wait();
    console.log("vote_on_proposal_2", vote_on_proposal_2);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });