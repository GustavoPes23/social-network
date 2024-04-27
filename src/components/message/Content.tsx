import { type FC, memo, useCallback } from "react";

import Textarea from "../comment/Textarea";
import { mapUsersIds } from "../../utils/users";
import { motion } from "framer-motion";

interface ContentProps {
  readonly showEditMessage: boolean;
  readonly message: string;
  readonly messageEdit: string;
  readonly setMessageEdit: (message: string) => void;
  readonly handleRedirectToProfile: (userId: string) => void;
  readonly isLoading: boolean;
}

const Content: FC<ContentProps> = ({
  showEditMessage,
  message,
  messageEdit,
  setMessageEdit,
  handleRedirectToProfile,
  isLoading,
}) => {
  if (showEditMessage) {
    return <Textarea message={messageEdit} setMessage={setMessageEdit} />;
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="md:w-full w-77 h-2 bg-gray-200 rounded-full mb-2"></div>
        <div className="md:w-full w-64 h-2 bg-gray-200 rounded-full mb-2"></div>
        <div className="md:w-96 w-60 h-2 bg-gray-200 rounded-full mb-2"></div>
        <div className="md:w-80 md:hidden w-48 h-2 bg-gray-200 rounded-full mb-2"></div>
      </div>
    );
  }

  const handleMessages = useCallback(
    (messages: string) => {
      return messages.split(/(@\w+)/).map((word, index) => {
        if (!word.startsWith("@")) {
          return <span key={index}>{word}</span>;
        }

        const username = word.slice(1).toLowerCase();
        const id = mapUsersIds.get(username);

        if (!id) {
          return <span key={index}>{word}</span>;
        }

        return (
          <a
            key={index}
            className="text-blue-800 font-bold hover:cursor-pointer"
            onClick={() => handleRedirectToProfile(id)}
          >{`@${username}`}</a>
        );
      });
    },
    [handleRedirectToProfile]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, }}
    >
      <p>{handleMessages(message)}</p>
    </motion.div>
  );
};

export default memo(Content);
