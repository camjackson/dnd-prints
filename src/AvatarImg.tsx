type Props = {
  className: string;
  name: string;
  src: string;
};

const AvatarImg = ({ className, name, src }: Props) => {
  return (
    <span className={`${className} bg-gray-400`}>
      {src && (
        <img
          className="w-full h-full object-cover"
          alt={`${name} avatar`}
          src={src}
        />
      )}
    </span>
  );
};

export default AvatarImg;
