import React, { useEffect, useCallback, useState } from 'react';
import getWeb3 from '../getWeb3';
import ticketsContract from '../contracts/Tickets.json';

const Tickets = props => {
    const [tickets, setTickets] = useState([]);
    const [account, setAccount] = useState();

    const fetchTickets = useCallback(async () => {
        console.log('Started');
        const web3 = await getWeb3();
        console.log('web3', web3);
        const contract = new web3.eth.Contract(ticketsContract.abi, '0xcB6B84c209F5b56CE6554a2e98F695537d96F430');
        console.log('contract', contract);
        const ticketCount = await contract.methods.getTicketCount().call();
        console.log('ticketCount', ticketCount);
        const ticketsArray = [];
        for (let index = 0; index < ticketCount; index++) {
            const ticket = await contract.methods.tickets(index).call();
            ticketsArray.push(ticket);
        }
        setTickets(ticketsArray);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets])

    const buyTicket = useCallback(async (ticketId) => {
        console.log('Started', account);
        const web3 = await getWeb3();
        console.log('web3', web3);
        const contract = new web3.eth.Contract(ticketsContract.abi, '0xcB6B84c209F5b56CE6554a2e98F695537d96F430');
        console.log('contract', contract);
        await contract.methods.buyTicket(ticketId).call({
            from: account
        });
        fetchTickets();
    }, [account])

    console.log('tickets', tickets);

    return (
        <div>
            Tickets
            <div>
                {tickets && tickets.map(ticket =>
                    <div key={ticket.id}>
                        {ticket.owner == 0x00 ? <button onClick={() => buyTicket(ticket.id)}>Buy #{ticket.id}</button> : <button disabled>Sold #{ticket.id}</button>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tickets;