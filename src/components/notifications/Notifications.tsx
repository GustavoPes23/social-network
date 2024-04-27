import { useEffect, useState, type FC } from "react";
import { motion } from "framer-motion";

import type { Message } from "../../utils/messages";

import Notification from "../message/Message";
import Comment from "../comment/Comment";

interface NotificationsProps {
  defaultMessages: Message[];
}

const FILTER_USERS = "users";

const Notifications: FC<NotificationsProps> = ({ defaultMessages }) => {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [previousMessage, setPreviousMessages] =
    useState<Message[]>(defaultMessages);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const filterMessagesByUserId = (userId: string): Message[] => {
    return messages.filter((message) => message.userId === userId);
  };

  const filterByQueryParam = (): void => {
    const query = window.location.pathname.split("/");

    if (query[1] !== FILTER_USERS) {
      return;
    }

    const userId = query[2];

    if (!userId) {
      setFilter(undefined);
      return;
    }

    setPreviousMessages(messages);
    setFilter(userId);
    setMessages(filterMessagesByUserId(userId));
  };

  const clearFilters = (): void => {
    window.history.replaceState(null, "", window.location.origin);
    setFilter(undefined);
    setMessages(previousMessage);
  };

  useEffect(() => {
    if (isFiltered) {
      setIsFiltered(false);
      filterByQueryParam();
    }
  }, [isFiltered]);

  return (
    <>
      <motion.div
        className="flex md:h-screen justify-center items-center font-sans"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: {
            stiffness: 100,
            restDelta: 0.001,
          },
          delay: 0.2,
        }}
      >
        <div className="relative flex flex-col lg:w-[50vw] w-full">
          <div className="grid p-6">
            <motion.div
              className="flex flex-col gap-3"
              variants={{
                hidden: { opacity: 1, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {filter && (
                <span
                  className="text-blue-900 font-bold cursor-pointer"
                  onClick={clearFilters}
                >
                  View all
                </span>
              )}
              {messages.map((message) => (
                <Notification
                  key={message.id}
                  {...message}
                  messages={messages}
                  setMessages={setMessages}
                  setIsFiltered={setIsFiltered}
                />
              ))}
              <Comment messages={messages} setMessages={setMessages} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Notifications;
