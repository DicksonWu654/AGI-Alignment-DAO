pragma solidity >=0.8.0 <0.9.0;

import "./base_governance.sol";
import "./polygon_id_utils/lib/GenesisUtils.sol";
import "./polygon_id_utils/interfaces/ICircuitValidator.sol";
import "./polygon_id_utils/verifiers/ZKPVerifier.sol";

contract AGIAlignmentDAOPolygonID is AGIAlignmentDAO, ZKPVerifier {
    constructor(
        uint _proposalThreshold,
        uint _agreementThreshold,
    ) AGIAlignmentDAO(_proposalThreshold, _agreementThreshold) {}

    function _beforeProofSubmit(
        uint64 /* requestId */,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that the challenge input of the proof is equal to the msg.sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in the proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == 1 && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        uint256 id = inputs[validator.getChallengeInputIndex()];
        // whitelist address
        if (idToAddress[id] == address(0)) {
            isHuman[msg.sender] = true;
        }
    }
}
