import { useMemo } from 'react';

interface Chain {
  id: number;
  logo: string;
  name: string;
}

interface BalanceBreakdown {
  balance: string;
  balanceInFiat: number;
  chain: Chain;
  contractAddress: string;
  decimals: number;
  universe: number;
}

interface TokenBalance {
  abstracted: boolean;
  balance: string;
  balanceInFiat: number;
  breakdown: BalanceBreakdown[];
  decimals: number;
  icon: string;
  symbol: string;
}

export default function BalanceDisplay({ balances }: { balances: TokenBalance[] }) {
  const totalBalanceUSD = useMemo(() => 
    balances.reduce((acc, token) => acc + token.balanceInFiat, 0),
    [balances]
  );

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="bg-yellow-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-yellow-100 mb-2">
          Total Balance: ${totalBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
      </div>
      
      {balances.map((token, i) => (
        <div key={i} className="bg-yellow-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full" />
            <div>
              <h3 className="font-bold text-yellow-100">{token.symbol}</h3>
              <p className="text-sm text-yellow-200">
                {Number(token.balance).toLocaleString('en-US', { maximumFractionDigits: 6 })} {token.symbol}
                <span className="text-yellow-300 ml-2">
                  (${token.balanceInFiat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                </span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {token.breakdown
              .filter(b => Number(b.balance) > 0)
              .map((b, j) => (
                <div key={j} className="flex items-center gap-2 bg-yellow-950/30 p-2 rounded">
                  <img src={b.chain.logo} alt={b.chain.name} className="w-6 h-6 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-yellow-200">{b.chain.name}</p>
                    <p className="text-sm">
                      {Number(b.balance).toLocaleString('en-US', { maximumFractionDigits: 6 })}
                      <span className="text-yellow-300 ml-1">
                        (${b.balanceInFiat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                      </span>
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
