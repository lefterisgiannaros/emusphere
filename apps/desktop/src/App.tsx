import GameList from '../components/GameList';

export default function App() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <header className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-purple-400">
          RetroHub
        </h1>
      </header>
      <main className="p-6">
        <GameList />
      </main>
    </div>
  );
}