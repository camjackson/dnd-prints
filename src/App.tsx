import { useState } from 'react';
import PlayersForm, { Player } from './PlayersForm';

const newPlayer = (): Player => ({
  name: '',
  level: 0,
  race: '',
  class: '',
  avatarUrl: '',
});

const App = () => {
  const [players, setPlayers] = useState(() => [newPlayer()]);

  const addPlayer = () => setPlayers((old) => old.concat(newPlayer()));
  const removePlayer = (index: number) => () =>
    setPlayers((old) => old.filter((_, i) => i !== index));
  const updatePlayer =
    (index: number) => (field: keyof Player, value: Player[typeof field]) =>
      setPlayers((old) =>
        old.map((player, i) =>
          i === index ? { ...player, [field]: value } : player,
        ),
      );

  return (
    <main className="max-w-5xl h-full mx-auto bg-white shadow-2xl px-10 pt-5">
      <h1 className="text-3xl mb-3">D&D Prints</h1>
      <p className="mb-2">
        Create printable thingies for your D&D table. PC name cards, initiative
        tokens, etc.
      </p>
      <PlayersForm {...{ players, addPlayer, removePlayer, updatePlayer }} />
    </main>
  );
};

export default App;
