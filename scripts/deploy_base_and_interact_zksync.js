class Deployer {

    /**
     * @param hre Hardhat runtime environment. This object is provided to scripts by hardhat itself.
     * @param zkWallet The wallet which will be used to deploy the contracts.
     * @param deploymentType Optional deployment type that relates to the ContractDeployer system contract function to be called. Defaults to deploying regular smart contracts.
     */
    constructor(hre: HardhatRuntimeEnvironment, zkWallet: zk.Wallet, deploymentType?: zk.types.DeploymentType)

    /**
     * Created a `Deployer` object on ethers.Wallet object.
     *
     * @param hre Hardhat runtime environment. This object is provided to scripts by hardhat itself.
     * @param ethWallet The wallet used to deploy smart contracts.
     * @param deploymentType The optional deployment type that relates to the `ContractDeployer` system contract function to be called. Defaults to deploying regular smart contracts.
     */
    static fromEthWallet(hre: HardhatRuntimeEnvironment, ethWallet: ethers.Wallet, deploymentType?: zk.types.DeploymentType)

    /**
     * Loads an artifact and verifies that it was compiled by `zksolc`.
     *
     * @param contractNameOrFullyQualifiedName The name of the contract.
     *   It can be a bare contract name (e.g. "Token") if it's
     *   unique in your project, or a fully qualified contract name
     *   (e.g. "contract/token.sol:Token") otherwise.
     *
     * @throws Throws an error if a non-unique contract name is used,
     *   indicating which fully qualified names can be used instead.
     *
     * @throws Throws an error if an artifact was not compiled by `zksolc`.
     */
    public async loadArtifact(
        contractNameOrFullyQualifiedName: string
    ): Promise<ZkSyncArtifact>

    /**
     * Estimates the price of calling a deploy transaction in a certain fee token.
     *
     * @param artifact The previously loaded artifact object.
     * @param constructorArguments The list of arguments to be passed to the contract constructor.
     *
     * @returns Calculated fee in ETH wei.
     */
    public async estimateDeployFee(
        artifact: ZkSyncArtifact,
        constructorArguments: any[]
    ): Promise<ethers.BigNumber>

    /**
      * Sends a deploy transaction to the zkSync network.
      * For now it uses defaults values for the transaction parameters:
      *
      * @param artifact The previously loaded artifact object.
      * @param constructorArguments The list of arguments to be passed to the contract constructor.
      * @param overrides Optional object with additional deploy transaction parameters.
      * @param additionalFactoryDeps Additional contract bytecodes to be added to the factory dependencies list.
      * The fee amount is requested automatically from the zkSync Era server.
      *
      * @returns A contract object.
      */
    public async deploy(
        artifact: ZkSyncArtifact,
        constructorArguments: any[],
        overrides?: Overrides,
        additionalFactoryDeps?: ethers.BytesLike[],
    ): Promise<zk.Contract>

    /**
     * Extracts factory dependencies from the artifact.
     *
     * @param artifact Artifact to extract dependencies from
     *
     * @returns Factory dependencies in the format expected by SDK.
     */
    async extractFactoryDeps(artifact: ZkSyncArtifact): Promise<string[]>

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