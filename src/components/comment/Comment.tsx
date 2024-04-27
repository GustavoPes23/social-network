import { type FC, memo, useState, useCallback } from "react";

import { v4 as uuid } from "uuid";

import { you } from "../../utils/users";
import type { Message } from "../../utils/messages";

import { motion } from "framer-motion";
import Textarea from "./Textarea";
import Avatar from "./Avatar";
import Buttons from "./Buttons";

interface CommentProps {
  readonly buttonText?: string;
  readonly messageId?: string;
  readonly messages: Message[];
  setMessages: (m: Message[]) => void;
  setShowComment?: (b: boolean) => void;
  showComment?: boolean;
}

const show = {
  height: "100%",
  opacity: 2,
  display: "block",
  transition: { duration: 0.3, ease: "easeInOut" },
};

const hide = {
  height: 0,
  opacity: 0,
  transition: { duration: 0.3, ease: "easeInOut" },
  display: "none",
};

const createNewMessage = (
  userId: string,
  message: string,
  messageId?: string
): Message => {
  return {
    id: uuid(),
    userId: userId,
    messageId,
    message,
    likes: 0,
    date: "just now",
  };
};

const Comment: FC<CommentProps> = ({
  buttonText = "Send",
  messageId,
  messages,
  setMessages,
  setShowComment,
  showComment = true,
}) => {
  const [message, setMessage] = useState("");

  const sendMessages = useCallback((): void => {
    if (!message) {
      return;
    }

    const myMessage = createNewMessage(you!.id, message, messageId);
    const newMessage = [...messages, myMessage];

    setMessage("");

    if (!messageId) {
      setMessages(newMessage);
      return;
    }

    const index = messages.findIndex((msg) => msg.id === messageId);
    const updatedMessages = [...messages];
    updatedMessages.splice(index + 1, 0, myMessage);
    
    setMessages(updatedMessages);

    if (setShowComment) {
      setShowComment(false);
    }
  }, [message, messageId, messages, setMessages, setShowComment]);

  return (
    <>
      <motion.div
        className={`bg-white flex flex-row gap-1 p-6 rounded-md items-center w-full ${
          messageId && "-mt-5 mb-5"
        }`}
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
          },
        }}
        animate={showComment ? show : hide}
      >
        <div className="flex flex-row gap-4 items-start justify-between w-full desktop">
          <div className="flex flex-row gap-4 w-full justify-items-start">
            <Avatar avatar={you!.avatar} name={you!.name} />
            <Textarea message={message} setMessage={setMessage} />
          </div>
          <Buttons
            className="flex-col"
            buttonText={buttonText}
            messageId={messageId}
            sendMessages={sendMessages}
            setShowComment={setShowComment}
          />
        </div>

        <div className="flex flex-col gap-4 items-start justify-between w-full mobile">
          <Textarea message={message} setMessage={setMessage} />

          <div className="flex flex-row gap-4 w-full items-center justify-between">
            <Avatar avatar={you!.avatar} name={you!.name} />
            <Buttons
              className="flex-row"
              buttonText={buttonText}
              messageId={messageId}
              sendMessages={sendMessages}
              setShowComment={setShowComment}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default memo(Comment);
