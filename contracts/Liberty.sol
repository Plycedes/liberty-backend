// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Liberty {
    struct Petition{
        address owner;
        string title;
        string description;
        string image;
        uint256 votes;
        address[] voters;
    }

    event PetitionAdded(
        uint256 numberOfPetitons
    );
    event VoteCasted(
        uint256 numberOfVoters
    );

    mapping(uint256 => Petition) public petitons;
    uint256 public numberOfPetitions = 0;

    function createPetition(address _owner, string memory _title, string memory _description, string memory _image) public {
        Petition memory newPetition = petitons[numberOfPetitions];

        newPetition.owner = _owner;
        newPetition.title = _title;
        newPetition.description = _description;
        newPetition.image = _image;
        newPetition.votes = 0;

        numberOfPetitions++;
        emit PetitionAdded(numberOfPetitions);
    }

    function voteToPetition(uint256 _id) public {
        petitons[_id].votes++;
        petitons[_id].voters.push(msg.sender);
        emit VoteCasted(petitons[_id].votes);
    }

    function getPetitions() public view {

    }
}