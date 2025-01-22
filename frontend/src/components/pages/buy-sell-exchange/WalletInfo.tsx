import React from "react";

interface WalletInfoProps {
  wallet: Wallet;
  loading: boolean;
  error: string | null;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ wallet, loading, error }) => {
  return (
    <div className="wallet-info mb-6">
      <h2 className="text-xl text-blue-600 font-semibold mb-4">موجودی کیف پول</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-blue-700 font-medium">
          {Object.entries(wallet).map(([currency, balance]) => (
            <div key={currency}>
              {currency.toUpperCase()}: {balance}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
