import React from 'react';
import { Twitter, Github } from 'lucide-react';
import { APP_NAME, DISCORD_INVITE_LINK } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-start gap-2 mb-6">
              <Logo size="md" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The premier destination for football fans and Smoq 26 / Madfut traders. Join the Storm today.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href={DISCORD_INVITE_LINK} className="hover:text-blue-400 transition-colors">Join Server</a></li>
              <li><a href={DISCORD_INVITE_LINK} className="hover:text-blue-400 transition-colors">Rules</a></li>
              <li><a href={DISCORD_INVITE_LINK} className="hover:text-blue-400 transition-colors">Staff Application</a></li>
              <li><a href={DISCORD_INVITE_LINK} className="hover:text-blue-400 transition-colors">Report Issue</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Games</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://smoqgames.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Smoq 26</a></li>
              <li><a href="https://madfut.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Madfut</a></li>
              <li><a href="https://www.ea.com/games/ea-sports-fc" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">FIFA / EAFC</a></li>
              <li><a href="https://fantasy.premierleague.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Fantasy PL</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved. Not affiliated with Smoq Games or Madfut.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;