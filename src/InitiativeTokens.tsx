import { Player } from './PlayerFormRow';
import AvatarImg from './AvatarImg';

type Props = {
  players: Player[];
};

const InitiativeTokens = ({ players }: Props) => {
  return (
    <table className="table-fixed mt-4">
      <tbody>
        <tr className="break-inside-avoid">
          {players.map((player) => (
            <PlayerToken flip player={player} />
          ))}
        </tr>
        <tr className="break-inside-avoid">
          {players.map((player) => (
            <PlayerToken player={player} />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

type PlayerTokenProps = {
  flip?: boolean;
  player: Player;
};

const PlayerToken = ({ flip, player }: PlayerTokenProps) => {
  const rotate = flip ? 'rotate-180' : '';

  return (
    <td className={`w-24 h-24 p-0 border-2 border-black ${rotate}`}>
      <AvatarImg
        className="w-full h-full"
        name={player.name}
        src={player.avatarUrl}
      />
    </td>
  );
};

export default InitiativeTokens;
