'use client';
import { useState } from 'react';
import { WalletIcon, LogoutIcon } from './icons';

export default function ConnectButton({ className }: { className?: string }) {
  const [connected, setConnected] = useState(false);

  const onClick = async () => {
    const eth = (window as any)?.ethereum;
    if (!eth) {
      setConnected(false);
      return alert('Install an EIP-1193 wallet (e.g., MetaMask)');
    }

    if (!connected) {
      await eth.request?.({ method: 'eth_requestAccounts' });
      setConnected(true);
    } else {
      // In a real app, you might want to handle actual disconnect logic here
      setConnected(false);
    }
  };

  return (
    <button 
      className={`${className} flex items-center gap-2`} 
      onClick={onClick}
    >
      {connected ? (
        <>
          <LogoutIcon />
          Sign Out
        </>
      ) : (
        <>
          <WalletIcon />
          Sign In
        </>
      )}
    </button>
  );
}