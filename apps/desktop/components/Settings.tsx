import { useState, useEffect } from 'react';

interface SettingsData {
  retroAchievementsUsername?: string;
  retroAchievementsApiKey?: string;
  screenScraperUsername?: string;
  screenScraperPassword?: string;
  retroArchPath?: string;
  preferredRegion?: string;
  preferredLanguage?: string;
  artworkType?: string;
  romDirectories?: string;
}

export default function Settings({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('general');
  const [data, setData] = useState<SettingsData>({});

  useEffect(() => {
    fetch('http://localhost:3000/settings')
      .then(res => res.json())
      .then(setData);
  }, []);

  function save() {
    fetch('http://localhost:3000/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => onClose());
  }

  const tabs = ['general', 'retroachievements', 'screenscraper', 'emulators'];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-2/3 max-w-2xl p-6">
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded text-sm capitalize cursor-pointer ${
                activeTab === tab ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <label className="block text-sm text-gray-400">RetroArch Path</label>
            <input
              className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
              value={data.retroArchPath ?? ''}
              onChange={e => setData({ ...data, retroArchPath: e.target.value })}
            />
            <label className="block text-sm text-gray-400">Preferred Region</label>
            <select
              className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
              value={data.preferredRegion ?? 'us'}
              onChange={e => setData({ ...data, preferredRegion: e.target.value })}
            >
              <option value="us">USA</option>
              <option value="eu">Europe</option>
              <option value="jp">Japan</option>
            </select>
          </div>
        )}

        {activeTab === 'retroachievements' && (
          <div className="space-y-4">
            <label className="block text-sm text-gray-400">Username</label>
            <input
              className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
              value={data.retroAchievementsUsername ?? ''}
              onChange={e => setData({ ...data, retroAchievementsUsername: e.target.value })}
            />
            <label className="block text-sm text-gray-400">API Key</label>
            <input
              className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
              value={data.retroAchievementsApiKey ?? ''}
              onChange={e => setData({ ...data, retroAchievementsApiKey: e.target.value })}
            />
          </div>
        )}

        {activeTab === 'screenscraper' && (
          <div className="space-y-4">
            <label className="block text-sm text-gray-400">Username</label>
            <input
              className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
              value={data.screenScraperUsername ?? ''}
              onChange={e => setData({ ...data, screenScraperUsername: e.target.value })}
            />
            <label className="block text-sm text-gray-400">Password</label>
            <input
              type="password"
              className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
              value={data.screenScraperPassword ?? ''}
              onChange={e => setData({ ...data, screenScraperPassword: e.target.value })}
            />
          </div>
        )}

        {activeTab === 'emulators' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Emulator configuration coming soon.</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded text-sm cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}