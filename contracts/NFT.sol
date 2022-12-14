// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;


// bring in the openzeppelin ERC721 NFT functionality

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counters;
    Counters.counter private _tokenIds;
    // counters allow us to keep track of tokenId

    // address of marketplace for NFTs to interact
    address contractAddress;


    // OBJ: give the NFT market the ability to transact with tokens or change ownership
    // setApprovalForAll allows  us to do that with contract address

    // constructor set up our address
    constructor(address marketplaceAddress) ERD721('KryptoBirdz', 'KBIRDZ'){
        contractAddress = marketplaceAddress;
    }

    function mintToken(string memory tokenURI) public returns(unit) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        // set the token URI: id and url
        _setTokenURI(newItemId, tokenURI);
        // give the marketplace the approveal to transact between users
        setApprovalForAll(contractAddress, true);
        // min the token and set it for sale - return id to do so
        return newItemId;
    }
}