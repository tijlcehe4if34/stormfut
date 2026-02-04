import React, { useEffect, useRef } from 'react';
import Button from './Button';
import Logo from './Logo';
import { DISCORD_INVITE_LINK } from '../constants';
import { Bot, Trophy, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      // Direct DOM manipulation for performance (avoids React re-renders on scroll)
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translateY(${scrolled * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="hero" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Background gradients with Parallax Effect */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
        <div 
          ref={blob1Ref}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] transition-transform duration-75 ease-out will-change-transform"
        ></div>
        <div 
          ref={blob2Ref}
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] transition-transform duration-75 ease-out will-change-transform"
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Added Logo prominently with animation */}
        <div className="animate-fade-in-up mb-10 scale-125 sm:scale-150 transform transition-transform hover:scale-155 duration-500">
          <Logo size="lg" />
        </div>

        <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Top Rated Trading Community
        </div>

        <h1 className="animate-fade-in-up delay-200 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8">
          The Ultimate Hub for <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
            Football & Bot Trades
          </span>
        </h1>

        <p className="animate-fade-in-up delay-300 mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
          Join the elite community for Smoq 26 and Madfut. Automated trades, daily giveaways, and non-stop football discussion all in one place.
        </p>

        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row justify-center gap-4">
          <Button href={DISCORD_INVITE_LINK} variant="primary" icon>
            Join Discord Server
          </Button>
        </div>

        {/* Feature Highlights with staggered animation and float */}
        <div className="animate-fade-in-up delay-500 mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center animate-float float-delay-1 hover:bg-white/10 transition-colors duration-300">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 text-green-400">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Football Talk</h3>
            <p className="text-slate-400 text-sm mt-2">Live match discussions & news</p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center animate-float float-delay-2 hover:bg-white/10 transition-colors duration-300">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-400">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Smoq 26 Bots</h3>
            <p className="text-slate-400 text-sm mt-2">Fast automated trading system</p>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col items-center animate-float float-delay-3 hover:bg-white/10 transition-colors duration-300">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">Madfut Community</h3>
            <p className="text-slate-400 text-sm mt-2">Active trading & wishlists</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;