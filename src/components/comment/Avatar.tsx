import { type FC, memo } from "react";

interface AvatarProps {
  readonly avatar: string;
  readonly name: string;
}

const Avatar: FC<AvatarProps> = ({ avatar, name }) => {
  return <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />;
};

export default memo(Avatar);
