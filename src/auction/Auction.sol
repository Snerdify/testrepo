// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IERC721{
    function transferFrom(
        address from,
        address to,
        uint nftId
    )external ;
}

contract Auction{

    event Start();
    event Bid(address indexed sender, uint amount);
    event End(address highestBidder,uint amount);


    event Withdraw(address indexed bidder,uint amount);
    IERC721 public immutable nft;
    uint public immutable nftId;


    address payable public immutable seller;
    
    uint32 public endAt;
    bool public started;
    bool public ended;

    /*
    * address of the highest bidder
    */
    address public highestBidder;
    uint public highestBid;
    /*
    * this will store total amount of bids u made if you r not the highest bidder
    */
    mapping(address=>uint) public bids; 
    
    constructor(
        address _nft,
        uint _nftId,
        uint _startingBid){
            nft=IERC721(_nft);
            nftId=_nftId;
            seller=payable(msg.sender);  
            highestBid=_startingBid;


        }
        /*
        *@dev to start the auction this function requires the owner to be the seller
        *@dev once the auction is started it will continue for 7 days
        *
        */
        function start() external {
            require(msg.sender==seller,"not the seller!!");
            require(!started ," Already Started ");

            started=true;
            endAt=uint32(block.timestamp+60 );
            nft.transferFrom(seller,address(this),nftId);
            emit Start();


        }
         /*
         * if the current time is less than the end time of the auction, then a bid could be placed
         * bid is only valid if its more than the current highest bid
         * if the highest bidder exists then add the highest bid to the bids array
        */


        function bid() external payable{
            require(started,"Not Started");
            require(block.timestamp<endAt,"Ended");
            
            require(msg.value>highestBid,"Value<highestbid");

           
            if (highestBidder!=address(0)) {
                bids[highestBidder] +=highestBid;
            }
            highestBid=msg.value;
            highestBidder=msg.sender;

            emit Bid(msg.sender,msg.value);}
        
        
         /*
         *
        */
        function withdraw() external {
            uint bal=bids[msg.sender];
            bids[msg.sender]=0;
            payable(msg.sender).transfer(bal);
            emit Withdraw(msg.sender,bal);
        }

        
        
        /*
         *@dev end function is the function where anyone can end the contract when we reach end time, then seller 
         *receives the eth and highestbidder gets the nft
        */
        function end() external {
            require(started,"Not Started");
            require(!ended,"Ended");
            require(block.timestamp>=endAt,"Not ended");


            ended=true;
            /*
            *dont want to send nft to address 0(no one participated in the auction
            */
            if (highestBidder!=address(0)){
                nft.transferFrom(address(this),highestBidder,nftId);
                seller.transfer(highestBid); // transfer the highest bidded money to the seller

            }
            else{
                nft.transferFrom(address(this),seller,nftId);

                emit End(highestBidder,highestBid);

            }
           

        }
    
}