// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Betting {
    address public owner; // Contract owner

    // Structure to represent a user's bet
    struct Bet {
        bool exists;    // To track if the user has already placed a bet
        uint256 amount; // Bet amount
    }

    // Predefined match keys
    string[] public matchKeys;

    // Mapping to store bets for each user
    mapping(address => mapping(string => Bet)) private bets;

    // Events
    event MatchKeyAdded(string matchKey);
    event BetPlaced(address indexed user, string matchKey, uint256 amount);

    // Modifier to restrict functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    // Constructor to initialize match keys
    constructor(string[] memory initialMatchKeys) {
        owner = msg.sender; // Set the deployer as the owner
        for (uint256 i = 0; i < initialMatchKeys.length; i++) {
            matchKeys.push(initialMatchKeys[i]);
        }
    }

    // Function to add a new match key (only owner)
    function addMatchKey(string memory newMatchKey) external onlyOwner {
        require(!isValidMatchKey(newMatchKey), "Match key already exists");
        matchKeys.push(newMatchKey);
        emit MatchKeyAdded(newMatchKey);
    }

    // Function to place a bet on a predefined match
    function placeBet(address bettor, string memory matchKey) external payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(isValidMatchKey(matchKey), "Invalid match key");
        require(!bets[bettor][matchKey].exists, "You have already placed a bet");

        // Record the user's bet
        bets[bettor][matchKey] = Bet({
            exists: true,
            amount: msg.value
        });

        emit BetPlaced(bettor, matchKey, msg.value);
    }

    // Function to check if a user has placed a bet
    function hasPlacedBet(address bettor, string memory matchKey) external view returns (bool, uint256, string memory) {
        Bet memory userBet = bets[bettor][matchKey];
        return (userBet.exists, userBet.amount, matchKey);
    }

    // Helper function to validate a match key
    function isValidMatchKey(string memory matchKey) internal view returns (bool) {
        for (uint256 i = 0; i < matchKeys.length; i++) {
            if (keccak256(abi.encodePacked(matchKeys[i])) == keccak256(abi.encodePacked(matchKey))) {
                return true;
            }
        }
        return false;
    }
}
