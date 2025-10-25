'use client';
 
import { initializeWithProvider, isInitialized } from '../lib/nexus';
import { ReactNode } from 'react';
 
export default function InitButton({
  className,
  onReady,
  children,
}: {
  className?: string;
  onReady?: () => void;
  children?: ReactNode;
}) {
  const onClick = async () => {
    const eth = (window as any)?.ethereum;
    try {
      await initializeWithProvider(eth);
      onReady?.();
    } catch (e: any) {
      alert(e?.message ?? 'Init failed');
    }
  };
  return (
    <button className={className} onClick={onClick} disabled={isInitialized()}>
      {children || 'Start Session'}
    </button>
  );
}