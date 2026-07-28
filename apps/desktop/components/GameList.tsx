import { useState, useEffect } from 'react';
import GameCard from './GameCard';

interface Game {
  id: number;
  title: string;
  platform: string;
  coverImagePath: string | null;
  sku: string | null;
  isInBacklog: boolean;
}

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(() => setGames([]));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}