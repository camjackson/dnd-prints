import { Player } from './PlayerFormRow';
import paper from './assets/paper.jpg';
import AvatarImg from './AvatarImg';

type Props = {
  players: Player[];
};

const Namecards = ({ players }: Props) => {
  const rows: Player[][] = [];
  for (let i = 0; i < players.length; i += 2) {
    rows.push([players[i], players[i + 1]]);
  }

  return (
    <table
      className="w-full table-fixed"
      style={{ printColorAdjust: 'exact', backgroundImage: `url(${paper})` }}
    >
      <tbody>
        {rows.map(([leftPlayer, rightPlayer]) => (
          <>
            <tr className="break-inside-avoid break-after-avoid">
              {<PlayerNamecard flip player={leftPlayer} />}
              {<PlayerNamecard flip player={rightPlayer} />}
            </tr>
            <tr className="break-inside-avoid break-before-avoid">
              {<PlayerNamecard player={leftPlayer} />}
              {<PlayerNamecard player={rightPlayer} />}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

type PlayerNamecardProps = {
  flip?: boolean;
  player?: Player;
};

const PlayerNamecard = ({ flip, player }: PlayerNamecardProps) => {
  if (!player) return null;
  const rotate = flip ? 'rotate-180' : '';

  const { name, level, race, class: klass, avatarUrl } = player;

  return (
    <td className={`${rotate} border-2 border-black h-36 p-4`}>
      <div className="flex flex-row">
        <AvatarImg className="w-28 h-28" name={name} src={avatarUrl} />
        <div className="flex flex-col ml-4 justify-between">
          <h1 className="text-3xl">{name}</h1>
          <p className="text-xl">{race}</p>
          <p className="text-xl">{klass}</p>
        </div>
      </div>
    </td>
  );
};

export default Namecards;
