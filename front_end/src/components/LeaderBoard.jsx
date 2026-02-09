const LeaderBoard = ({ leaderboard }) => {
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="leaderboard-container">
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
          <p className="empty-text">No leaderboard data available</p>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

          .leaderboard-container {
            min-height: 100vh;
            background: #fafafa;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            padding: 2rem 1rem;
          }

          .empty-state {
            text-align: center;
          }

          .empty-icon {
            width: 48px;
            height: 48px;
            color: #999999;
            margin: 0 auto 1rem;
          }

          .empty-text {
            font-size: 1rem;
            color: #666666;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <div className="header">
          <div className="trophy-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
          </div>
          <h1 className="title">Leaderboard</h1>
          <p className="subtitle">{leaderboard.length} {leaderboard.length === 1 ? 'participant' : 'participants'}</p>
        </div>

        <div className="rankings">
          {leaderboard.map((player, index) => (
            <div
              key={player.id}
              className={`rank-item ${index < 3 ? 'top-three' : ''}`}
            >
              <div className="rank-left">
                <span className={`rank-number ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`}>
                  {index + 1}
                </span>
                <span className="player-name">{player.name}</span>
              </div>

              <span className="player-points">
                {player.points} <span className="points-label">pts</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .leaderboard-container {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 2rem 1rem;
        }

        .leaderboard-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 2.5rem;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e8e8e8;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .trophy-icon {
          width: 56px;
          height: 56px;
          background: #f5f5f5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }

        .trophy-icon svg {
          width: 28px;
          height: 28px;
          color: #1a1a1a;
        }

        .title {
          font-family: 'Sora', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 0.375rem;
        }

        .subtitle {
          font-size: 0.9375rem;
          color: #666666;
        }

        .rankings {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .rank-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          background: #fafafa;
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
        }

        .rank-item.top-three {
          background: #f8f8f8;
          border-color: #e8e8e8;
        }

        .rank-item:hover {
          transform: translateX(2px);
          border-color: #e0e0e0;
        }

        .rank-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .rank-number {
          font-family: 'Sora', sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: #666666;
          min-width: 32px;
          text-align: center;
        }

        .rank-number.first {
          color: #1a1a1a;
          font-size: 1.25rem;
        }

        .rank-number.second {
          color: #333333;
          font-size: 1.1875rem;
        }

        .rank-number.third {
          color: #4a4a4a;
          font-size: 1.1875rem;
        }

        .player-name {
          font-size: 1rem;
          font-weight: 500;
          color: #1a1a1a;
        }

        .player-points {
          font-family: 'Sora', sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .points-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #666666;
        }

        @media (max-width: 640px) {
          .leaderboard-card {
            padding: 2rem 1.5rem;
          }

          .title {
            font-size: 1.5rem;
          }

          .rank-item {
            padding: 0.875rem 1rem;
          }

          .rank-number {
            font-size: 1rem;
            min-width: 28px;
          }

          .rank-number.first {
            font-size: 1.125rem;
          }

          .rank-number.second,
          .rank-number.third {
            font-size: 1.0625rem;
          }

          .player-name {
            font-size: 0.9375rem;
          }

          .player-points {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LeaderBoard;