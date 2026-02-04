import React, { useRef, useState, useEffect } from 'react';
import { MessageSquare, Bell, Hash, ExternalLink, Bot, Zap, Users, Gamepad2, AlertCircle } from 'lucide-react';
import { DISCORD_INVITE_LINK } from '../constants';
import Button from './Button';

interface FeedItemProps {
  id: number;
  author: string;
  role: string;
  content: string;
  time: string;
  tag: string;
  color: string;
}

interface BotStatuses {
  smoq: boolean;
  madfut: boolean;
}

interface DiscordFeedProps {
  feedItems: FeedItemProps[];
  botStatuses: BotStatuses;
}

const FeedItemCard: React.FC<{ item: FeedItemProps; index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`glass-card p-5 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-300 group fade-up-element ${isVisible ? 'in-view' : ''}`}
    >
      <div className="flex gap-4">
        {/* Avatar Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-lg select-none">
            {item.author.charAt(0)}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white truncate">{item.author}</span>
              <span className="text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                {item.role}
              </span>
            </div>
            <span className="text-xs text-slate-500">{item.time}</span>
          </div>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            {item.content}
          </p>

          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${item.color}`}>
              {item.tag === 'Status' && <Bell className="w-3 h-3 mr-1.5" />}
              {item.tag === 'Giveaway' && <ExternalLink className="w-3 h-3 mr-1.5" />}
              {item.tag === 'Trade' && <Hash className="w-3 h-3 mr-1.5" />}
              {item.tag}
            </div>
            <a href={DISCORD_INVITE_LINK} className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
              View <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiscordFeed: React.FC<DiscordFeedProps> = ({ feedItems, botStatuses }) => {
  return (
    <div id="feed" className="py-24 bg-slate-900 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Feed Header & Status Dashboard */}
          <div className="lg:col-span-2 sticky top-24">
            
            {/* New Modern Status Card */}
            <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 bg-indigo-900/10 relative overflow-hidden backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>
                
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Live Status
                </h3>

                <div className="space-y-3">
                    {/* Smoq 26 */}
                    <div className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-default ${botStatuses.smoq ? 'bg-slate-800/50 border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5' : 'bg-red-900/10 border-red-500/10 hover:bg-red-900/20'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${botStatuses.smoq ? 'bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20' : 'bg-red-500/10 text-red-400'}`}>
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm">Smoq 26 Bot</p>
                                <p className={`text-[10px] font-medium tracking-wide uppercase flex items-center gap-1 ${botStatuses.smoq ? 'text-green-400' : 'text-red-400'}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${botStatuses.smoq ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                  {botStatuses.smoq ? 'Operational' : 'Offline'}
                                </p>
                            </div>
                        </div>
                        {botStatuses.smoq ? (
                          <Zap className="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors duration-300" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500/50" />
                        )}
                    </div>

                    {/* Madfut */}
                    <div className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-default ${botStatuses.madfut ? 'bg-slate-800/50 border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5' : 'bg-red-900/10 border-red-500/10 hover:bg-red-900/20'}`}>
                        <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg transition-colors ${botStatuses.madfut ? 'bg-purple-500/10 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/20' : 'bg-red-500/10 text-red-400'}`}>
                                <Gamepad2 className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm">Madfut Bot</p>
                                <p className={`text-[10px] font-medium tracking-wide uppercase flex items-center gap-1 ${botStatuses.madfut ? 'text-green-400' : 'text-red-400'}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${botStatuses.madfut ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                  {botStatuses.madfut ? 'Operational' : 'Offline'}
                                </p>
                            </div>
                        </div>
                        {botStatuses.madfut ? (
                          <Zap className="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors duration-300" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500/50" />
                        )}
                    </div>
                </div>
            </div>
          </div>

          {/* Feed Items */}
          <div className="lg:col-span-3 space-y-4">
            {feedItems.map((item, index) => (
              <FeedItemCard key={item.id} item={item} index={index} />
            ))}
            
            {feedItems.length === 0 && (
                <div className="text-center pt-4">
                    <span className="text-sm text-slate-500 animate-pulse">Waiting for new events...</span>
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DiscordFeed;