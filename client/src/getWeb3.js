import Web3 from "web3";

const getWeb3 = async () => {
  if (typeof window.ethereum == 'undefined') {
    console.log('Metamask is not installed');
  } else {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    web3.currentProvider = window.ethereum;
    return web3;
  }
}

export default getWeb3;
