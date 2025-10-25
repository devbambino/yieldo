'use client';
 
import { getUnifiedBalances, isInitialized } from '../lib/nexus';
import { ReactNode } from 'react';
 
export default function FetchUnifiedBalanceButton({
  className,
  onResult,
  children,
}: {
  className?: string;
  onResult?: (r: any) => void;
  children?: ReactNode;
}) {
  const onClick = async () => {
    if (!isInitialized()) return alert('Initialize first');
    const res = await getUnifiedBalances();
    onResult?.(res);
    console.log(res);
  };
  return (
    <button className={className} onClick={onClick} disabled={!isInitialized()}>
      {children || 'Check Balances'}
    </button>
  );
}