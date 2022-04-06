const Tickets = artifacts.require('Tickets');
const assert = require('assert');

contract('Tickets', (accounts) => {
    it('should have 10 accounts', () => {
        assert.equal(accounts.length, 10, 'Yes, 10')
    })

    // Testing the ticket buying process
    it('buying the ticket', async () => {
        const tickets = await Tickets.deployed();
        await tickets.buyTicket(0, {
            from: accounts[0],
            value: web3.utils.toWei("1", "ether")
        });
        const firstTicket = await tickets.tickets(0);
        assert.equal(firstTicket.owner, accounts[0], 'Ticket has successfully assigned to address')
    })

    it('fails if wrong ticketId is used', async () => {
        const tickets = await Tickets.deployed();
        try {
            tickets.buyTicket(-2, {
                from: accounts[0],
                value: web3.utils.toWei("1", "ether")
            })
        } catch (error) {
            assert.match(error.message, 'ticketId is wrong')
        }
    })
})