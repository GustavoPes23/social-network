import { type FC, memo } from "react";

interface NameProps {
    readonly isLoading: boolean;
    readonly name: string;
    readonly userId: string;
    readonly handleRedirectToProfile: (userId: string) => void;
}

const Name: FC<NameProps> = ({ isLoading, name, userId, handleRedirectToProfile }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="md:w-40 w-20 h-2 bg-gray-200 rounded-full mb-2"></div>
      </div>
    );
  }

  return (
    <span
      className="font-bold cursor-pointer"
      onClick={() => handleRedirectToProfile(userId)}
    >
      {name}
    </span>
  );
};

export default memo(Name);
