import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DiscordFeed from './components/DiscordFeed';
import Features from './components/Features';
import Stats from './components/Stats';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ScrollToTop from './components/ScrollToTop';
import { INITIAL_FEED_ITEMS } from './constants';

interface FeedItem {
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

const App: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(INITIAL_FEED_ITEMS);
  const [botStatuses, setBotStatuses] = useState<BotStatuses>({ smoq: true, madfut: true });

  // Load from local storage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('stormFutFeedItems');
    if (savedItems) {
      try {
        setFeedItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }

    const savedBots = localStorage.getItem('stormFutBotStatuses');
    if (savedBots) {
      try {
        setBotStatuses(JSON.parse(savedBots));
      } catch (e) {
        console.error("Failed to parse saved bot statuses", e);
      }
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    localStorage.setItem('stormFutFeedItems', JSON.stringify(feedItems));
  }, [feedItems]);

  useEffect(() => {
    localStorage.setItem('stormFutBotStatuses', JSON.stringify(botStatuses));
  }, [botStatuses]);

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <DiscordFeed feedItems={feedItems} botStatuses={botStatuses} />
        <Features />
        <Stats />
      </main>
      <Footer />
      <ScrollToTop />
      <AdminPanel 
        items={feedItems} 
        setItems={setFeedItems} 
        botStatuses={botStatuses}
        setBotStatuses={setBotStatuses}
      />
    </div>
  );
};

export default App;