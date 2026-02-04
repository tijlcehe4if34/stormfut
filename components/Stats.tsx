import React from 'react';
import { STATS, DISCORD_INVITE_LINK } from '../constants';
import Button from './Button';

const Stats: React.FC = () => {
  return (
    <div id="community" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/20 skew-y-3 origin-bottom-left transform -translate-y-20 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 text-center border-t border-white/10 shadow-2xl shadow-black/50">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8">
            Join the Fastest Growing <br />
            <span className="text-indigo-400">Trading Community</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 border-y border-white/5 py-12">
            {STATS.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <dt className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
                  {stat.value}
                </dt>
                <dd className="text-sm font-medium uppercase tracking-wider text-slate-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-slate-300 mb-4 max-w-xl">
              Don't miss out on the action. Click below to join the server and start trading with the best bots in the game.
            </p>
            <Button href={DISCORD_INVITE_LINK} variant="primary" className="text-lg px-8 py-4 shadow-xl shadow-indigo-500/20 scale-100 hover:scale-105 transition-transform">
              Join Discord Server Now
            </Button>
            <p className="text-xs text-slate-500 mt-4">
              *Discord account required to join.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;