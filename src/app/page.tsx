'use client';

import { useState } from 'react';
import ConnectButton from '@/components/connect-button';
import InitButton from '@/components/init-button';
import FetchUnifiedBalanceButton from '@/components/fetch-unified-balance-button';
import DeinitButton from '@/components/de-init-button';
import { isInitialized } from '@/lib/nexus';
import BalanceDisplay from '@/components/balance-display';
import { PowerIcon, RefreshIcon } from '@/components/icons';

export default function Page() {
  const [initialized, setInitialized] = useState(isInitialized());
  const [connected, setConnected] = useState(true);
  const [balances, setBalances] = useState<any>(null);

  const btn =
    'px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className='font-bold text-6xl p-6 text-orange'>Yield0x</h1>
        
        <div className="flex flex-col gap-4 items-center bg-yellow-950/30 p-6 rounded-xl w-full max-w-md">
          <div className="flex gap-4 w-full">
            <ConnectButton className={`${btn} flex-1`} />
            {!initialized && (
              <InitButton onReady={() => setInitialized(true)}  className={`${btn} flex-1 flex items-center justify-center gap-2`}>
                <PowerIcon />
                Initialize
              </InitButton>
            )}
          </div>

          {initialized && (
            <div className="flex gap-4 w-full">
              <FetchUnifiedBalanceButton 
                className={`${btn} flex-1 flex items-center justify-center gap-2`}
                onResult={(r) => setBalances(r)}
              >
                <RefreshIcon />
                Refresh Balances
              </FetchUnifiedBalanceButton>
              <DeinitButton 
                className={`${btn} flex-1 flex items-center justify-center gap-2 !bg-red-700 hover:!bg-red-800`}
                onDone={() => { setInitialized(false); setBalances(null); }}
              >
                <PowerIcon />
                Stop
              </DeinitButton>
            </div>
          )}

          <div className="mt-2 text-sm flex items-center gap-2 text-yellow-100">
            <div className={`w-2 h-2 rounded-full ${initialized ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span>{initialized ? 'Session Active' : 'Session Inactive'}</span>
          </div>
        </div>

        {balances && <BalanceDisplay balances={balances} />}
      </div>
    </main>
  );
}