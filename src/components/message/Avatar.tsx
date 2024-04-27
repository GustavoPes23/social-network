import { motion } from "framer-motion";
import { type FC, memo } from "react";

interface AvatarProps {
  readonly isLoading: boolean;
  readonly avatar: string;
  readonly name: string;
  readonly handleRedirectToProfile: (userId: string) => void;
  readonly userId: string;
}

const Avatar: FC<AvatarProps> = ({
  isLoading,
  avatar,
  name,
  handleRedirectToProfile,
  userId,
}) => {
  if (isLoading) {
    return (
      <div className="animte-pulse">
        <svg
          className="w-10 h-10 me-3 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => {
          handleRedirectToProfile(userId);
        }}
      />
    </motion.div>
  );
};

export default memo(Avatar);
