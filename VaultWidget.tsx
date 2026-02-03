
import React, { useState, useEffect } from 'react';
import { useWallet, CardanoWallet } from '@meshsdk/react';
import { Transaction, Asset } from '@meshsdk/core';
import { vaultScript } from '../constants/vaultScript';

export default function VaultWidget() {
  const { connected, wallet } = useWallet();
  const [targetAmount, setTargetAmount] = useState('50');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    setLoading(true);
    try {
      const tx = new Transaction({ initiator: wallet });
      tx.sendLovelace(
        { address: 'addr_test1...', datum: { value: targetAmount } }, 
        (parseInt(targetAmount) * 1000000).toString()
      );
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      await wallet.submitTx(signedTx);
      alert('Deposit Successful!');
    } catch (e) {
      console.error(e);
      alert('Transaction Failed');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">Savings Vault</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm opacity-70">Target Goal (ADA)</label>
          <input 
            type="number" 
            className="w-full bg-black/20 border border-white/10 p-3 rounded-lg mt-1"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </div>
        
        <div className="w-full bg-gray-700 h-2 rounded-full">
            <div className="bg-green-400 h-full rounded-full" style={{width: '20%'}}></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button onClick={handleDeposit} className="bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-500 transition">Deposit</button>
            <button disabled={true} className="bg-gray-600 py-3 rounded-xl font-semibold opacity-50 cursor-not-allowed">Withdraw</button>
        </div>
      </div>
    </div>
  );
}
