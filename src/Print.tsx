import { Player } from './PlayerFormRow';
import paper from './assets/paper.jpg';

type Props = {
  players: Player[];
};

const Print = ({ players }: Props) => {
  const rows: Player[][] = [];
  for (let i = 0; i < players.length; i += 2) {
    rows.push([players[i], players[i + 1]]);
  }

  return (
    <table
      className="hidden print:table w-full table-fixed"
      style={{ printColorAdjust: 'exact', backgroundImage: `url(${paper})` }}
    >
      <tbody>
        {rows.map(([leftPlayer, rightPlayer]) => (
          <>
            <tr>
              {<PrintPlayer player={leftPlayer} />}
              {<PrintPlayer player={rightPlayer} />}
            </tr>
            <tr>
              {<PrintPlayer flip player={leftPlayer} />}
              {<PrintPlayer flip player={rightPlayer} />}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

type PrintPlayerProps = {
  flip?: boolean;
  player?: Player;
};

const PrintPlayer = ({ flip, player }: PrintPlayerProps) => {
  if (!player) return null;
  const rotate = flip ? 'rotate-180' : '';

  const { name, level, race, class: klass, avatarUrl } = player;

  return (
    <td className={`${rotate} border-2 border-black h-36 p-4`}>
      <div className="flex flex-row">
        <span className="w-28 h-28 bg-gray-400">
          {avatarUrl && (
            <img className="w-full h-full" alt={name} src={avatarUrl} />
          )}
        </span>
        <div className="flex flex-col ml-4 justify-between">
          <h1 className="text-3xl">{name}</h1>
          <p className="text-xl">{race}</p>
          <p className="text-xl">{klass}</p>
        </div>
      </div>
    </td>
  );
};

export default Print;
