// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyMeCoffee {
    
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable immutable i_owner;

    constructor(){
        i_owner = payable(msg.sender);
    }

    modifier checkEth(){
        require(msg.value > 0,"Send eth morethan 0");
        _;
    }

    function buyCoffe(string calldata name,string calldata message) external payable checkEth  {
        (bool sent, ) = i_owner.call{value:msg.value}("");
        require(sent,"failed to send");

        memos.push(Memo(name,message,block.timestamp,msg.sender));
    }

    function getMemos() external view  returns(Memo[] memory){
        return memos;
    }
}