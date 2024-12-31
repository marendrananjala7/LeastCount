import { useState } from 'react';
import { Lock, Edit, Check } from 'lucide-react';

interface Player {
  name: string;
  scores: number[];
}

interface ScoreTableProps {
}

const ScoreTable: React.FC<ScoreTableProps> = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Plaer 1', scores: [0, 0, 0] },
    { name: 'Player 2', scores: [0, 0, 0] },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [isPasscodeValid, setIsPasscodeValid] = useState(false);

  const handleScoreChange = (playerIndex: number, roundIndex: number, score: number) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].scores[roundIndex] = score;
    setPlayers(newPlayers);
  };

  const handleNameChange = (playerIndex: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].name = name;
    setPlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    const newPlayers = [...players];
    newPlayers.push({ name: `Player ${players.length + 1}`, scores: new Array(players[0].scores.length).fill(0) });
    setPlayers(newPlayers);
  };

  const handleAddRound = () => {
    const newPlayers = [...players];
    newPlayers.forEach(player => player.scores.push(0));
    setPlayers(newPlayers);
  };

  const handleSave = () => {
    localStorage.setItem('players', JSON.stringify(players));
  };

  const handleLoad = () => {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  };

  const handlePasscodeChange = (passcode: string) => {
    setPasscode(passcode);
  };

  const handlePasscodeEntry = (enteredPasscode: string) => {
    setEnteredPasscode(enteredPasscode);
    setIsPasscodeValid(enteredPasscode === passcode);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Least Count Score Tracker</h1>
        {editMode ? (
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggleEditMode}>
            <Lock className="mr-2" />
            Lock
          </button>
        ) : (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggleEditMode}>
            <Edit className="mr-2" />
            Edit
          </button>
        )}
      </div>
      {editMode && (
        <div className="mb-4">
          <input
            type="password"
            value={enteredPasscode}
            onChange={(e) => handlePasscodeEntry(e.target.value)}
            placeholder="Enter passcode"
            className="py-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
          />
          {isPasscodeValid ? (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggleEditMode}>
              <Check className="mr-2" />
              Unlock
            </button>
          ) : (
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggleEditMode}>
              <Lock className="mr-2" />
              Invalid passcode
            </button>
          )}
        </div>
      )}
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Player</th>
            {players[0].scores.map((_, index) => (
              <th key={index} className="px-4 py-2">
                Round {index + 1}
              </th>
            ))}
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td className="px-4 py-2">
                {editMode && isPasscodeValid ? (
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleNameChange(playerIndex, e.target.value)}
                    className="py-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
                  />
                ) : (
                  player.name
                )}
              </td>
              {player.scores.map((score, roundIndex) => (
                <td key={roundIndex} className="px-4 py-2">
                  {editMode && isPasscodeValid ? (
                    <input
                      type="number"
                      value={score}
                      onChange={(e) => handleScoreChange(playerIndex, roundIndex, parseInt(e.target.value))}
                      className="py-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
                    />
                  ) : (
                    score
                  )}
                </td>
              ))}
              <td className="px-4 py-2">
                {player.scores.reduce((a, b) => a + b, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddPlayer}>
          Add Player
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddRound}>
          Add Round
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
          Save
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={handleLoad}>
          Load
        </button>
      </div>
    </div>
  );
};

export default ScoreTable;