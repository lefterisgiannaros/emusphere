interface Game {
    id: number;
    title: string;
    platform: string;
    coverImagePath: string | null;
    isInBacklog: boolean;
  }
  
  export default function GameCard({ game }: { game: Game }) {
    return (
      <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition">
        
        {/* Cover image or placeholder */}
        <div className="w-16 h-16 rounded bg-gray-700 flex items-center justify-center shrink-0">
          {game.coverImagePath ? (
            <img
              src={game.coverImagePath}
              alt={game.title}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <span className="text-xs text-gray-400 text-center px-1">
              {game.platform}
            </span>
          )}
        </div>
  
        {/* Game info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{game.title}</p>
          <p className="text-sm text-gray-400">{game.platform}</p>
        </div>
  
        {/* Launch button */}
        <button
          onClick={() => fetch(`http://localhost:3000/games/${game.id}/launch`, { method: 'POST' })}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded text-sm font-medium transition cursor-pointer"
        >
          Launch
        </button>
      </div>
    );
  }