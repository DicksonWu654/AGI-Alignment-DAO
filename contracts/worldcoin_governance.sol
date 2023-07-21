pragma solidity >=0.8.0 <0.9.0;

import "./base_governance.sol";
import "./IWorldID.sol";

contract AGIAlignmentDAOWorldcoin is AGIAlignmentDAO {
    IWorldID public worldID;

    constructor(
        uint _proposalThreshold,
        uint _agreementThreshold,
        address _worldID
    ) AGIAlignmentDAO(_proposalThreshold, _agreementThreshold) {
        worldID = IWorldID(_worldID);
    }

    function verifyHuman(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external {
        worldID.verifyProof(
            root,
            groupId,
            signalHash,
            nullifierHash,
            externalNullifierHash,
            proof
        );
        isHuman[msg.sender] = true;
    }
}
