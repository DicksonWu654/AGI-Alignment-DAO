pragma solidity >=0.8.0 <0.9.0;

import "./polygon_id_utils/lib/GenesisUtils.sol";
import "./polygon_id_utils/interfaces/ICircuitValidator.sol";
import "./polygon_id_utils/verifiers/ZKPVerifier.sol";
import "./IWorldID.sol";

contract AGIAlignmentDAOFinal is ZKPVerifier {
    address public admin; //Admin for now because I need it for the demo lol - but in the future it'll be the dao that sets the threshold
    uint public proposalThreshold;
    uint public agreementThreshold; //it's a percentage
    IWorldID public worldID;
    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    enum VoteType {
        ADD,
        REMOVE
    }

    struct Proposal {
        string text;
        bool passed;
        uint votesFor;
        uint votesAgainst;
        VoteType voteType;
    }

    Proposal[] public constitution;
    mapping(address => bool) public isHuman;
    mapping(uint => mapping(address => bool)) public votes;

    constructor(
        uint _proposalThreshold,
        uint _agreementThreshold,
        address _worldID
    ) {
        admin = msg.sender;
        proposalThreshold = _proposalThreshold;
        agreementThreshold = _agreementThreshold;
        worldID = IWorldID(_worldID);
    }

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
            _verifyHuman();
        }
    }

    function _verifyHuman() internal {
        isHuman[msg.sender] = true;
    }

    function verifyHumanWorldcoin(
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
        _verifyHuman();
    }

    function changeThresholds(
        uint _proposalThreshold,
        uint _agreementThreshold
    ) external {
        require(msg.sender == admin, "Only admin can change thresholds.");
        proposalThreshold = _proposalThreshold;
        agreementThreshold = _agreementThreshold;
    }

    function createProposal(string calldata _text) external {
        require(
            isHuman[msg.sender],
            "Only verified humans can create proposals."
        );
        constitution.push(
            Proposal({
                text: _text,
                passed: false,
                votesFor: 0,
                votesAgainst: 0,
                voteType: VoteType.ADD
            })
        );
    }

    function vote(uint _proposal, bool _agree) external {
        require(isHuman[msg.sender], "Only verified humans can vote.");
        require(_proposal < constitution.length, "Proposal does not exist.");
        require(!votes[_proposal][msg.sender], "Already voted.");

        votes[_proposal][msg.sender] = true;

        if (_agree) {
            constitution[_proposal].votesFor++;
        } else {
            constitution[_proposal].votesAgainst++;
        }
    }

    function checkProposal(uint _proposal) external {
        require(_proposal < constitution.length, "Proposal does not exist.");

        // If enough votes for adding the proposal
        if (
            constitution[_proposal].voteType == VoteType.ADD &&
            constitution[_proposal].votesFor > proposalThreshold &&
            (constitution[_proposal].votesFor * 100) /
                (constitution[_proposal].votesFor +
                    constitution[_proposal].votesAgainst) >
            agreementThreshold
        ) {
            constitution[_proposal].passed = true;
            flipProposal(_proposal);
        }
        // If enough votes for removing the proposal
        else if (
            constitution[_proposal].voteType == VoteType.REMOVE &&
            constitution[_proposal].votesFor > proposalThreshold &&
            (constitution[_proposal].votesFor * 100) /
                (constitution[_proposal].votesFor +
                    constitution[_proposal].votesAgainst) >
            agreementThreshold
        ) {
            constitution[_proposal].passed = false;
            flipProposal(_proposal);
        }
    }

    function flipProposal(uint _proposal) internal {
        require(_proposal < constitution.length, "Proposal does not exist.");

        if (constitution[_proposal].voteType == VoteType.ADD) {
            constitution[_proposal].voteType = VoteType.REMOVE;
        } else {
            constitution[_proposal].voteType = VoteType.ADD;
        }

        constitution[_proposal].votesFor = 0;
        constitution[_proposal].votesAgainst = 0;
    }

    function callConstitution() external view returns (Proposal[] memory) {
        return constitution;
    }
}
