import InitiativeTokens from './InitiativeTokens';
import Namecards from './Namecards';
import { Player } from './PlayerFormRow';

type Props = {
  players: Player[];
};

const Print = ({ players }: Props) => {
  return (
    <div className="hidden print:block">
      <Namecards players={players} />
      <InitiativeTokens players={players} />
    </div>
  );
};

export default Print;
