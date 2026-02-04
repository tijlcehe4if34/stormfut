import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Plus, Trash2, Lock, User, Clock, Tag, Zap } from 'lucide-react';
import Button from './Button';

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

interface AdminPanelProps {
  items: FeedItem[];
  setItems: React.Dispatch<React.SetStateAction<FeedItem[]>>;
  botStatuses: BotStatuses;
  setBotStatuses: React.Dispatch<React.SetStateAction<BotStatuses>>;
}

const PRESETS = {
  Announcement: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Status: "bg-green-500/20 text-green-300 border-green-500/30",
  Giveaway: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Trade: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Alert: "bg-red-500/20 text-red-300 border-red-500/30"
};

const AdminPanel: React.FC<AdminPanelProps> = ({ items, setItems, botStatuses, setBotStatuses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [localItems, setLocalItems] = useState<FeedItem[]>(items);
  const [localBotStatuses, setLocalBotStatuses] = useState<BotStatuses>(botStatuses);

  // Sync local state when props change
  useEffect(() => {
    setLocalItems(items);
    setLocalBotStatuses(botStatuses);
  }, [items, botStatuses]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'tips' && password === 'tips65') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSave = () => {
    setItems(localItems);
    setBotStatuses(localBotStatuses);
    setIsOpen(false);
  };

  const handleUpdateItem = (id: number, field: keyof FeedItem, value: string) => {
    setLocalItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleTagChange = (id: number, newTag: string) => {
    const color = PRESETS[newTag as keyof typeof PRESETS] || PRESETS.Announcement;
    setLocalItems(prev => prev.map(item => 
      item.id === id ? { ...item, tag: newTag, color: color } : item
    ));
  };

  const handleAddItem = () => {
    const newItem: FeedItem = {
      id: Date.now(),
      author: "New User",
      role: "Member",
      content: "New announcement...",
      time: "Just now",
      tag: "Announcement",
      color: PRESETS.Announcement
    };
    setLocalItems([newItem, ...localItems]);
  };

  const handleDeleteItem = (id: number) => {
    setLocalItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full shadow-lg border border-white/10 transition-all duration-200"
        title="Admin Panel"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-500" />
                {isAuthenticated ? 'Feed Admin Panel' : 'Admin Login'}
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Login Form */}
            {!isAuthenticated && (
              <div className="p-8 flex flex-col items-center justify-center space-y-6">
                <div className="p-4 bg-indigo-500/10 rounded-full mb-2">
                   <Lock className="w-8 h-8 text-indigo-400" />
                </div>
                <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-lg py-2 pl-10 pr-4 text-white outline-none transition-colors"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-lg py-2 pl-10 pr-4 text-white outline-none transition-colors"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                  
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    Login
                  </button>
                </form>
              </div>
            )}

            {/* Admin Content Area (Only if authenticated) */}
            {isAuthenticated && (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Bot Status Settings */}
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 space-y-3">
                     <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        Bot Status Control
                     </h3>
                     <div className="space-y-3 pt-1">
                        
                        {/* Smoq Control */}
                        <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-white/5">
                           <span className="text-sm text-slate-300">Smoq 26 Bot</span>
                           <button 
                             onClick={() => setLocalBotStatuses(prev => ({...prev, smoq: !prev.smoq}))}
                             className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${localBotStatuses.smoq ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}
                           >
                             {localBotStatuses.smoq ? 'ONLINE' : 'OFFLINE'}
                           </button>
                        </div>

                        {/* Madfut Control */}
                        <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-white/5">
                           <span className="text-sm text-slate-300">Madfut Bot</span>
                           <button 
                             onClick={() => setLocalBotStatuses(prev => ({...prev, madfut: !prev.madfut}))}
                             className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${localBotStatuses.madfut ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}
                           >
                             {localBotStatuses.madfut ? 'ONLINE' : 'OFFLINE'}
                           </button>
                        </div>

                     </div>
                  </div>

                  <div className="border-t border-white/10"></div>

                  <div className="flex justify-between items-center">
                    <p className="text-slate-400 text-sm">Edit the live feed content below.</p>
                    <button 
                      onClick={handleAddItem}
                      className="flex items-center gap-2 text-xs font-medium bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 transition-colors border border-indigo-500/20"
                    >
                      <Plus className="w-3 h-3" /> Add Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localItems.map((item) => (
                      <div key={item.id} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-500 block mb-1">Author</label>
                            <input
                              type="text"
                              value={item.author}
                              onChange={(e) => handleUpdateItem(item.id, 'author', e.target.value)}
                              className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 block mb-1">Role</label>
                             <input
                              type="text"
                              value={item.role}
                              onChange={(e) => handleUpdateItem(item.id, 'role', e.target.value)}
                              className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-500 block mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</label>
                            <input
                              type="text"
                              value={item.time}
                              onChange={(e) => handleUpdateItem(item.id, 'time', e.target.value)}
                              className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                              placeholder="e.g. 5 mins ago"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 block mb-1 flex items-center gap-1"><Tag className="w-3 h-3" /> Type</label>
                            <select
                              value={item.tag}
                              onChange={(e) => handleTagChange(item.id, e.target.value)}
                              className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none appearance-none"
                            >
                              {Object.keys(PRESETS).map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Content</label>
                          <textarea
                            value={item.content}
                            onChange={(e) => handleUpdateItem(item.id, 'content', e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded px-2 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none h-20"
                          />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                           <span className="text-xs text-slate-500">ID: {item.id}</span>
                           <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-400/10 rounded transition-colors"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;