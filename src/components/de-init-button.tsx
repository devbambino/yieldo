'use client';
 
import { deinit, isInitialized } from '../lib/nexus';
import { ReactNode } from 'react';
 
export default function DeinitButton({
  className,
  onDone,
  children,
}: {
  className?: string;
  onDone?: () => void;
  children?: ReactNode;
}) {
  const onClick = async () => {
    await deinit();
    onDone?.();
  };
  return (
    <button className={className} onClick={onClick} disabled={!isInitialized()}>
      {children || 'Close Session'}
    </button>
  );
}