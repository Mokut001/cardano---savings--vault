
'use client';
import { CardanoWallet } from '@meshsdk/react';
import VaultWidget from '../components/VaultWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 right-8">
        <CardanoWallet />
      </div>
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight">SaveSmart</h1>
        <p className="text-lg opacity-80">Automated target-based savings on Cardano.</p>
        <VaultWidget />
      </div>
    </main>
  );
}