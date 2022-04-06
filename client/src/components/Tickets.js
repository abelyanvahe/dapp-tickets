import React, { useEffect, useCallback, useState } from 'react';
import getWeb3 from '../getWeb3';
import ticketsContract from '../contracts/Tickets.json';

const Tickets = props => {
    const [tickets, setTickets] = useState([]);
    const [account, setAccount] = useState();

    const fetchTickets = useCallback(async () => {
        const web3 = await getWeb3();
        const contract = new web3.eth.Contract(ticketsContract.abi, '0x01Dada94D213F846C578DA3b17Fb8C1658031149');
        const ticketCount = await contract.methods.getTicketCount().call();
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
        const web3 = await getWeb3();
        const contract = new web3.eth.Contract(ticketsContract.abi, '0x01Dada94D213F846C578DA3b17Fb8C1658031149');
        const price = web3.utils.toWei('1', 'ether')  // 0.5 ETH == 10^18 wei
        await contract.methods.buyTicket(ticketId).send({
            from: account,
            value: price
        });
        fetchTickets();
    }, [account])

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