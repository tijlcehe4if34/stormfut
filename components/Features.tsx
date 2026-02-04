import React from 'react';
import { Zap, ShieldCheck, Gift, MessageCircle, BarChart3, Globe } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Instant Bot Trades",
      description: "Get the cards you need instantly with our high-speed bots for Smoq 26 and Madfut. No waiting times.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      color: "from-yellow-500/20 to-orange-500/5"
    },
    {
      title: "Daily Giveaways",
      description: "We host massive giveaways every day. Win rare packs, coins, and exclusive roles just by being active.",
      icon: <Gift className="w-6 h-6 text-pink-400" />,
      color: "from-pink-500/20 to-rose-500/5"
    },
    {
      title: "Safe Environment",
      description: "Our staff team and security bots ensure a scam-free zone. Trade with confidence and peace of mind.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 to-teal-500/5"
    },
    {
      title: "Football Lounge",
      description: "Discuss Premier League, La Liga, and Champions League with passionate fans. Live match threads.",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 to-cyan-500/5"
    },
    {
      title: "Active Chats",
      description: "Never a dull moment. Our general chat is always popping with discussions, memes, and fun.",
      icon: <MessageCircle className="w-6 h-6 text-indigo-400" />,
      color: "from-indigo-500/20 to-violet-500/5"
    },
    {
      title: "Market Insights",
      description: "Get tips on player values and market trends to maximize your trading profits.",
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 to-fuchsia-500/5"
    }
  ];

  return (
    <div id="features" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Join Us?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We offer more than just trades. We offer a home for football enthusiasts and hardcore gamers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all duration-300 group overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;