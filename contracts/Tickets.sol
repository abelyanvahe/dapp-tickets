// SPDX License Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Tickets {
    uint ticketCount;

    struct Ticket {
        uint id;
        address owner;
        uint price;
    }

    Ticket[] public tickets;

    constructor(uint _ticketCount) public {
        ticketCount = _ticketCount;
        for (uint i = 0; i < ticketCount; i++) {
            tickets.push(Ticket({
                id: i,
                owner: address(0x00),
                price: 1 ether
            }));
        }
    }

    function getTicketCount() public view returns (uint) {
        return ticketCount;
    }

    function buyTicket(uint _ticketId) public payable {
        require(_ticketId >= 0 && _ticketId < ticketCount, "ticketId is wrong");
        // Make sure the ticket is not already sold
        require(tickets[_ticketId].owner == address(0x00));
        // Make sure buyer sends enought payment
        require(msg.value >= tickets[_ticketId].price);
        tickets[_ticketId].owner = msg.sender;
    }
}