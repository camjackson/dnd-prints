import { Player } from './PlayerFormRow';
import PlayersForm from './PlayersForm';
import Print from './Print';
import useLocalStorageState from './useLocalStorageState';

const newPlayer = (): Player => ({
  name: '',
  level: 0,
  race: '',
  class: '',
  avatarUrl: '',
});

const App = () => {
  const [players, setPlayers] = useLocalStorageState('players', () => [
    newPlayer(),
  ]);

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
    <>
      <main className="max-w-5xl h-full mx-auto bg-white shadow-2xl px-10 pt-5 flex flex-col print:hidden">
        <h1 className="text-3xl mb-3">D&D Prints</h1>
        <p className="mb-2">
          Create printable thingies for your D&D table. PC name cards,
          initiative tokens, etc.
        </p>
        <PlayersForm {...{ players, addPlayer, removePlayer, updatePlayer }} />
        <button
          type="button"
          className="self-end mt-4 py-2 px-4 rounded-md border bg-green-100 hover:bg-green-200 active:bg-green-300 border-green-500"
          onClick={window.print}
        >
          Print
        </button>
        <span className="self-end mt-2 italic">Tip: Print in landscape!</span>
      </main>
      <Print players={players} />
    </>
  );
};

export default App;
