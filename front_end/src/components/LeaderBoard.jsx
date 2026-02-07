const LeaderBoard = ({ leaderboard }) => {
  if (!leaderboard || leaderboard.length === 0) {
    return <p>No leaderboard data available</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Leaderboard 🏆
      </h1>

      <div className="space-y-2">
        {leaderboard.map((player, index) => (
          <div
            key={player.id}
            className="flex justify-between items-center p-3 rounded bg-gray-100"
          >
            <span className="font-semibold">
              {index + 1}. {player.name}
            </span>

            <span className="font-bold">
              {player.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
