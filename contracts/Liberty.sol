// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

//author: @plycedes

contract Liberty {
    struct Petition{
        address owner;
        string title;
        string description;
        string image;
        uint256 votes;
        address[] voters;
    }
    
    mapping(uint256 => Petition) public petitions;

    uint256 public numberOfPetitions = 0;

    function createPetition(
        address _owner, 
        string memory _title, 
        string memory _description, 
        string memory _image
    ) public returns (uint256){
        Petition storage newPetition = petitions[numberOfPetitions];

        newPetition.owner = _owner;
        newPetition.title = _title;
        newPetition.description = _description;
        newPetition.image = _image;
        newPetition.votes = 0;

        numberOfPetitions++;
        return numberOfPetitions - 1;        
    }

    function voteToPetition(uint256 _id) public {
        require(_id < numberOfPetitions, "Petition does not exists");
        Petition storage petition = petitions[_id];
        petition.votes++;
        petition.voters.push(msg.sender);        
    }

    function getVoters(uint256 _id) view public returns(address[] memory){
        return petitions[_id].voters;
    }

    function getPetitions() public view returns(Petition[] memory) {
        Petition[] memory allPetitions = new Petition[](numberOfPetitions);

        for(uint i = 0; i < numberOfPetitions; i++){
            Petition storage item = petitions[i];
            allPetitions[i] = item;
        }

        return allPetitions;
    }
}