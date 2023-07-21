const { expect } = require("chai");

describe("AGIAlignmentDAO", function () {
    let AGIAlignmentDAO;
    let agiAlignmentDAO;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        AGIAlignmentDAO = await ethers.getContractFactory("AGIAlignmentDAO");
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        agiAlignmentDAO = await AGIAlignmentDAO.deploy(1, 50);
        await agiAlignmentDAO.deployed();
    });

    it("should set the admin", async function () {
        expect(await agiAlignmentDAO.admin()).to.equal(owner.address);
    });

    it("should set the proposal threshold", async function () {
        expect(await agiAlignmentDAO.proposalThreshold()).to.equal(1);
    });

    it("should set the agreement threshold", async function () {
        expect(await agiAlignmentDAO.agreementThreshold()).to.equal(50);
    });

    it("should verify a human", async function () {
        await agiAlignmentDAO.verifyHuman(addr1.address);
        expect(await agiAlignmentDAO.isHuman(addr1.address)).to.equal(true);
    });

    it("should change the thresholds", async function () {
        await agiAlignmentDAO.changeThresholds(2, 60);
        expect(await agiAlignmentDAO.proposalThreshold()).to.equal(2);
        expect(await agiAlignmentDAO.agreementThreshold()).to.equal(60);
    });

    it("should create a proposal", async function () {
        await agiAlignmentDAO.verifyHuman(owner.address);
        await agiAlignmentDAO.createProposal("Test Proposal");
        output_struct = await agiAlignmentDAO.constitution(0);

        expect(output_struct.text).to.equal("Test Proposal");
        expect(output_struct.passed).to.equal(false);
        expect(output_struct.votesFor).to.equal(ethers.BigNumber.from(0));
        expect(output_struct.votesAgainst).to.equal(ethers.BigNumber.from(0));
        expect(output_struct.voteType).to.equal(ethers.BigNumber.from(0));
    });

    it("should vote", async function () {
        await agiAlignmentDAO.verifyHuman(owner.address);
        await agiAlignmentDAO.createProposal("Test Proposal");
        await agiAlignmentDAO.vote(ethers.BigNumber.from(0), true);
        expect(await agiAlignmentDAO.votes(ethers.BigNumber.from(0), owner.address)).to.equal(true);
    });

    it("should pass a proposal", async function () {
        await agiAlignmentDAO.verifyHuman(owner.address);
        await agiAlignmentDAO.createProposal("Test Proposal");
        await agiAlignmentDAO.vote(ethers.BigNumber.from(0), true);
        await agiAlignmentDAO.connect(addr1).verifyHuman(addr1.address);
        await agiAlignmentDAO.connect(addr1).vote(ethers.BigNumber.from(0), true);
        await agiAlignmentDAO.checkProposal(ethers.BigNumber.from(0));
        expect((await agiAlignmentDAO.constitution(ethers.BigNumber.from(0))).passed).to.equal(true);
    });

    it("should fail a proposal", async function () {
        await agiAlignmentDAO.verifyHuman(owner.address);
        await agiAlignmentDAO.createProposal("Test Proposal");
        await agiAlignmentDAO.vote(ethers.BigNumber.from(0), false);
        await agiAlignmentDAO.connect(addr1).verifyHuman(addr1.address);
        await agiAlignmentDAO.connect(addr1).vote(ethers.BigNumber.from(0), false);
        await agiAlignmentDAO.checkProposal(ethers.BigNumber.from(0));
        expect((await agiAlignmentDAO.constitution(ethers.BigNumber.from(0))).passed).to.equal(false);
    }
    );

    it("should fail a proposal with not enough votes", async function () {
        await agiAlignmentDAO.verifyHuman(owner.address);
        await agiAlignmentDAO.createProposal("Test Proposal");
        await agiAlignmentDAO.vote(ethers.BigNumber.from(0), true);
        await agiAlignmentDAO.checkProposal(ethers.BigNumber.from(0));
        expect((await agiAlignmentDAO.constitution(ethers.BigNumber.from(0))).passed).to.equal(false);
    }
    );

    it("should fail a proposal with not enough agreement", async function () {
        await agiAlignmentDAO.verifyHuman(owner.address);
        await agiAlignmentDAO.createProposal("Test Proposal");
        await agiAlignmentDAO.vote(ethers.BigNumber.from(0), true);
        await agiAlignmentDAO.connect(addr1).verifyHuman(addr1.address);
        await agiAlignmentDAO.connect(addr1).vote(ethers.BigNumber.from(0), false);
        await agiAlignmentDAO.checkProposal(ethers.BigNumber.from(0));
        expect((await agiAlignmentDAO.constitution(ethers.BigNumber.from(0))).passed).to.equal(false);
    }
    );

    it("should fail to vote if not verified", async function () {
        await expect(agiAlignmentDAO.vote(ethers.BigNumber.from(0), true)).to.be.revertedWith("Only verified humans can vote.");
    }
    );

    it("should fail to create a proposal if not verified", async function () {
        await expect(agiAlignmentDAO.createProposal("Test Proposal")).to.be.revertedWith("Only verified humans can create proposals.");
    }
    );

    it("should fail to vote twice", async function () {
        await agiAlignmentDAO.verifyHuman(owner.address);
        await agiAlignmentDAO.createProposal("Test Proposal");
        await agiAlignmentDAO.vote(ethers.BigNumber.from(0), true);
        await expect(agiAlignmentDAO.vote(ethers.BigNumber.from(0), true)).to.be.revertedWith("Already voted.");
    }
    );



}
);