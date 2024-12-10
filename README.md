# Betting contract
- This smart contract allows users to place bets on predefined matches and check their betting status. It also provides functionality for the contract owner to add new match keys.
  - Features
    - Predefined Match Keys:
      - The contract owner can initialize and add match keys.
    - Place Bets:
      - Users can place bets on predefined matches by sending Ether.
    - Check Betting Status:
      - Users can verify if they have placed a bet on a specific match.

- ## Contract Details

  - ### State Variables

    - owner: The address of the contract owner.

    - matchKeys: An array of predefined match keys.

    - bets: A mapping that tracks bets for each user by match key.

    - Structs

        - Bet:

            - exists: A boolean indicating if a user has already placed a bet on the match.

            - amount: The amount of Ether placed as the bet.

- ## Functions

    - ### Constructor
        ```JS
        constructor(string[] memory initialMatchKeys)
        ```
        - Initializes the contract with an initial set of match keys.
        - Sets the deployer of the contract as the owner.

    - ### addMatchKey
        ```JS
        function addMatchKey(string memory newMatchKey) external onlyOwner
        ```
        - Adds a new match key to the list.
        - Access Control: Only the contract owner can call this function.
        - Emits the MatchKeyAdded event.

    - ### placeBet
        ```JS
        function placeBet(address bettor, string memory matchKey) external payable
        ```
        - Allows a user to place a bet on a specific match key.
        - Requires a non-zero Ether amount.
        - Ensures the match key is valid and that the user has not already placed a bet on it.
        - Emits the BetPlaced event.

    - ### hasPlacedBet
        ```JS
        function hasPlacedBet(address bettor, string memory matchKey) external view returns (bool, uint256, string memory)
        ```
        - Checks if a user has placed a bet on a specific match key.
        - Returns:
            - exists: Boolean indicating if the bet exists.
            - amount: The amount of Ether bet.
            - matchKey: The match key.

    - ### isValidMatchKey (Internal)
        ```JS
        function isValidMatchKey(string memory matchKey) internal view returns (bool)
        ```
        - Validates whether a match key exists in the predefined list.

- ## Events

    - ### MatchKeyAdded
        ```JS
        event MatchKeyAdded(string matchKey);
        ```
        - Triggered when a new match key is added by the owner.

    - ### BetPlaced
        ```JS
        event BetPlaced(address indexed user, string matchKey, uint256 amount);
        ```
        - Triggered when a user places a bet on a match.