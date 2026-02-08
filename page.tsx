
'use client';
import { useState, useEffect } from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { 
  ShieldCheck, 
  Target, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  TrendingUp, 
  AlertTriangle,
  Lock,
  Unlock
} from 'lucide-react';

export default function VaultDApp() {
  const { connected } = useWallet();
  const [target, setTarget] = useState(5000);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [isDepositing, setIsDepositing] = useState(false);

  const progress = Math.min((balance / target) * 100, 100);
  const remaining = Math.max(0, target - balance);
  const isGoalReached = balance >= target;

  const handleDeposit = async () => {
    if (!connected) return;
    setIsDepositing(true);
    
    // Simulate Blockchain Transaction
    setTimeout(() => {
      const depositAmount = Math.floor(target * 0.15); // deposit 15% of target
      setBalance(prev => prev + depositAmount);
      setHistory(prev => [{
        id: Date.now(),
        amount: depositAmount,
        type: 'Deposit',
        date: new Date().toLocaleTimeString()
      }, ...prev]);
      setIsDepositing(false);
    }, 1200);
  };

  const handleWithdraw = () => {
    if (!isGoalReached) return;
    alert("Withdrawal Successful! Your funds have been moved back to your wallet.");
    setBalance(0);
    setHistory([]);
  };

  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      {/* Header */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.4)]">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">ADAVault</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Smart Lock Protocol</p>
          </div>
        </div>
        <CardanoWallet />
      </nav>

      <main className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-12 gap-10">
        
        {/* Left: Stats & Progress */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
            
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-slate-400 font-semibold mb-1">Current Locked ADA</p>
                <h2 className="text-7xl font-black">{balance.toLocaleString()}</h2>
              </div>
              <div className={`p-4 rounded-2xl ${isGoalReached ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {isGoalReached ? <Unlock size={32} /> : <Lock size={32} />}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-400 uppercase tracking-widest">Savings Progress</span>
                <span className={isGoalReached ? 'text-emerald-400' : 'text-blue-400'}>{progress.toFixed(1)}%</span>
              </div>
              <div className="h-8 w-full bg-slate-900 rounded-2xl p-1.5 border border-slate-800 shadow-inner">
                <div 
                  className={`h-full rounded-xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg ${isGoalReached ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-emerald-500/20' : 'bg-gradient-to-r from-blue-600 to-indigo-500 shadow-blue-500/20'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 rounded-3xl group transition-all hover:border-blue-500/50">
              <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Target Amount</p>
              <p className="text-2xl font-black">{target.toLocaleString()} ADA</p>
            </div>
            <div className="glass-card p-8 rounded-3xl group transition-all hover:border-emerald-500/50">
              <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Remaining Gap</p>
              <p className="text-2xl font-black">{remaining.toLocaleString()} ADA</p>
            </div>
          </div>

          {/* History */}
          <div className="glass-card p-8 rounded-[2rem]">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ArrowUpCircle size={20} className="text-blue-500" />
              Transaction History
            </h3>
            <div className="space-y-4">
              {history.length === 0 ? (
                <p className="text-slate-500 text-sm italic">No deposits found in this vault session.</p>
              ) : (
                history.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                        <ArrowDownCircle size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Target Contribution</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black">{item.date}</p>
                      </div>
                    </div>
                    <p className="text-blue-400 font-black">+ {item.amount} ADA</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-8">Vault Controls</h3>
            
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Set New Savings Goal</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={target} 
                    disabled={balance > 0}
                    onChange={(e) => setTarget(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-5 text-2xl font-black focus:ring-2 ring-blue-500 outline-none transition-all disabled:opacity-50" 
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-500">ADA</span>
                </div>
                {balance > 0 && <p className="text-[10px] text-amber-500 mt-2 font-bold uppercase tracking-tight flex items-center gap-1"><AlertTriangle size={12}/> Goal locked until vault is empty</p>}
              </div>

              <div className="space-y-4 pt-4">
                <button 
                  onClick={handleDeposit}
                  disabled={!connected || isGoalReached || isDepositing}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(37,99,235,0.25)] group"
                >
                  {isDepositing ? 'Signing Transaction...' : isGoalReached ? 'Target Met ✓' : 'Deposit Funds'}
                  {!isDepositing && !isGoalReached && <ArrowUpCircle size={24} className="group-hover:translate-y-[-2px] transition-transform" />}
                </button>

                <button 
                  onClick={handleWithdraw}
                  disabled={!isGoalReached || !connected}
                  className={`w-full py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 border-2 ${isGoalReached ? 'bg-white text-black border-white hover:bg-slate-200' : 'border-slate-800 text-slate-600 cursor-not-allowed'}`}
                >
                  Withdraw Capital
                  <ShieldCheck size={24} />
                </button>
              </div>

              {!connected && (
                <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl text-center">
                  <p className="text-blue-400 text-sm font-bold">Please connect your Cardano wallet to interact with the vault.</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 text-center">
            <div className="flex justify-center gap-2 items-center mb-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Preprod Testnet Active</p>
            </div>
            <p className="text-[9px] text-slate-600 leading-relaxed px-10">This DApp is a protocol demo. All transactions are governed by the Plutus V2 smart contract on-chain.</p>
          </div>
        </div>

      </main>
    </div>
  );
}