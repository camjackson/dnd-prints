import { ChangeEvent } from 'react';
import AvatarImg from './AvatarImg';

export type Player = {
  name: string;
  level: number;
  race: string;
  class: string;
  avatarUrl: string;
};

type Props = {
  player: Player;
  removePlayer: () => void;
  updatePlayer: (field: keyof Player, value: Player[typeof field]) => void;
};

const PlayerFormRow = ({ player, removePlayer, updatePlayer }: Props) => {
  return (
    <div className="mb-2 flex flex-row gap-4 items-center">
      <AvatarImg
        className="w-16 h-16"
        name={player.name}
        src={player.avatarUrl}
      />
      <Input
        className="w-36"
        type="text"
        value={player.name}
        onChange={(name) => updatePlayer('name', name)}
        label="Name"
        placeholder="Drizzt"
      />
      <Input
        className="w-16"
        type="number"
        value={player.level}
        onChange={(level) => updatePlayer('level', level)}
        label="Level"
        placeholder="20"
        min={1}
        max={20}
        step={1}
      />
      <Input
        className="w-24"
        type="text"
        value={player.race}
        onChange={(race) => updatePlayer('race', race)}
        label="Race"
        placeholder="Drow"
      />
      <Input
        className="w-32"
        type="text"
        value={player.class}
        onChange={(klass) => updatePlayer('class', klass)}
        label="Class"
        placeholder="Ranger"
      />
      <Input
        className="w-48"
        type="text"
        value={player.avatarUrl}
        onChange={(avatarUrl) => updatePlayer('avatarUrl', avatarUrl)}
        label="Avatar URL"
        placeholder="https://example.com/drizzt.jpg"
        allowImageUpload
      />
      <button
        type="button"
        className="ml-auto border px-4 py-2 rounded-md bg-red-200 border-red-600 hover:bg-red-300 active:bg-red-400"
        onClick={removePlayer}
      >
        Remove
      </button>
    </div>
  );
};

type InputProps = InputType & {
  className?: string;
  label: string;
  placeholder: string;
  onChange: (val: string) => void;
  allowImageUpload?: boolean;
};

type InputType =
  | { type: 'text'; value: string }
  | { type: 'number'; value: number; min: number; max: number; step: number };

const Input = ({
  type,
  value,
  onChange,
  label,
  placeholder,
  className,
  allowImageUpload,
}: InputProps) => {
  const onFileUpload = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const fileInput = changeEvent.target;
    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      onChange(loadEvent.target?.result?.toString() ?? '');
      fileInput.value = '';
    };

    reader.readAsDataURL((changeEvent.target.files ?? [])[0]);
  };
  return (
    <div className="relative">
      {allowImageUpload && (
        <label className="cursor-pointer">
          <span className="cursor-pointer border rounded-md py-0.5 px-1 absolute right-0 -top-0.5 border-gray-300 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-sm">
            Choose file
          </span>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={onFileUpload}
          />
        </label>
      )}
      <label className="flex flex-col">
        <div>{label}</div>
        <input
          className={`mt-1 pl-2 border ${className}`}
          {...{ type, placeholder, value }}
          name={label}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default PlayerFormRow;
