import { ethers } from 'ethers';

export const citreaConfig = {
  chainId: 5115,
  rpcUrl: 'https://rpc.testnet.citrea.xyz',
  explorer: 'https://explorer.testnet.citrea.xyz',
  currency: 'cBTC',
};

export const getProvider = () => {
  return new ethers.JsonRpcProvider(citreaConfig.rpcUrl, {
    chainId: citreaConfig.chainId,
    name: 'Citrea Testnet',
  });
};

export const getWallet = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    return provider.getSigner();
  }
  throw new Error('No wallet detected');
};

export const getSyncStatus = async () => {
  const provider = getProvider();
  const response = await provider.send('citrea_syncStatus', []);
  return response;
};

export const getLatestBlock = async () => {
  const provider = getProvider();
  const block = await provider.send('ledger_getHeadL2Block', []);
  return block;
};