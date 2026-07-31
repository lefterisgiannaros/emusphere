import { useState } from 'react';
import GameList from '../components/GameList';
import Settings from '../components/Settings';

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <header className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-purple-400">
          EmuSphere
        </h1>
        <button
          onClick={() => setSettingsOpen(true)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm cursor-pointer"
        >
          Settings
        </button>
      </header>
      <main className="p-6">
        <GameList />
      </main>
      {settingsOpen && <Settings onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}