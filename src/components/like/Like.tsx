import { type FC, memo } from "react";
import { motion } from "framer-motion";

import "./styles.scss";

import type { Message } from "../../utils/messages";

import IconPlus from "../../assets/images/icon-plus.svg";
import IconMinus from "../../assets/images/icon-minus.svg";

interface LikeProps {
  readonly className?: string;
  readonly likes: number;
  readonly messageId: string;
  readonly messages: Message[];
  readonly setMessages: (m: Message[]) => void;
  readonly isLoading: boolean;
}

const Like: FC<LikeProps> = ({
  className = "",
  likes,
  messageId,
  messages,
  setMessages,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className={`md:w-12 md:h-20 w-28 h-6 bg-gray-200 rounded-lg mb-2 ${className}`}></div>
      </div>
    );
  }

  const handleVote = (up: boolean = true) => {
    const newMessages = messages.map((message: Message): Message => {
      if (message.id !== messageId) {
        return message;
      }

      return {
        ...message,
        likes: up ? message.likes + 1 : message.likes - 1,
      };
    });

    setMessages(newMessages);
  };

  return (
    <div
      className={`flex md:flex-col flex-row bg-gray-100 md:p-4 px-6 py-2 rounded-lg items-center gap-2 justify-center ${className}`}
    >
      <motion.button
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleVote()}
      >
        <img
          className="w-3 h-3 hover:text-blue-600"
          src={IconPlus}
          alt="Plus"
        />
      </motion.button>

      <span className="font-bold text-blue-800">{likes}</span>
      <motion.button
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleVote(false)}
      >
        <img className="" src={IconMinus} alt="Minus" />
      </motion.button>
    </div>
  );
};

export default memo(Like);
