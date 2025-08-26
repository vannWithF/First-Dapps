// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract digitalID {
    // Struct untuk data KTP
    struct Identity {
        string name;
        string homeAddress;
        string birthdate;
        bool exists;
    }

    // Mapping: wallet address ke data KTP
    mapping(address => Identity) private identities;

    // Event untuk log saat data di-set
    event IdentitySet(address indexed user, string name, string homeAddress, string birthdate);

    // Fungsi untuk set data KTP
    function setIdentity(string memory _name, string memory _homeAddress, string memory _birthdate) public {
        identities[msg.sender] = Identity({
            name: _name,
            homeAddress: _homeAddress,
            birthdate: _birthdate,
            exists: true
        });
        emit IdentitySet(msg.sender, _name, _homeAddress, _birthdate);
    }

    // Fungsi untuk get data KTP
    function getIdentity(address _user) public view returns (string memory, string memory, string memory, bool) {
        Identity memory id = identities[_user];
        return (id.name, id.homeAddress, id.birthdate, id.exists);
    }
}