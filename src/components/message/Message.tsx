import { type FC, useState, useCallback } from "react";
import { motion } from "framer-motion";

import "./styles.scss";

import type { Message } from "../../utils/messages";

import { users, you, mapUsersIds } from "../../utils/users";

import Like from "../like/Like";
import Comment from "../comment/Comment";
import Modal from "../modal/Modal";
import ButtonActions from "./ButtonActions";
import Textarea from "../comment/Textarea";
import TagYou from "./TagYou";

interface MessageProps extends Message {
  readonly messages: Message[];
  setMessages: (m: Message[]) => void;
  setIsFiltered: (filtered: boolean) => void;
}

const redirectToProfile = (userId: string): void => {
  const currentURL = window.location.origin;
  window.history.replaceState(null, "", `${currentURL}/users/${userId}`);
};

const Message: FC<MessageProps> = ({
  id,
  userId,
  message,
  likes,
  date,
  messageId,
  messages,
  setMessages,
  setIsFiltered,
}) => {
  const [showComment, setShowComment] = useState<boolean>(false);
  const [uniqueMessage, setUniqueMessage] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditMessage, setShowEditMessage] = useState<boolean>(false);

  const isReply = messageId && !uniqueMessage;

  const userData = users.find((user) => user.id === userId);
  const isYou = userId === you.id;

  const handleRedirectToProfile = (userId: string): void => {
    redirectToProfile(userId);
    setIsFiltered(true);
    setUniqueMessage(true);
  };

  const handleMessages = useCallback(
    (messages: string) => {
      const processedMessages = messages.split(/(@\w+)/).map((word, index) => {
        if (word.startsWith("@")) {
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
        } else {
          return <span key={index}>{word}</span>;
        }
      });

      return processedMessages;
    },
    [handleRedirectToProfile]
  );

  const deleteMessage = useCallback(
    (userMessageId: string, messageId: string) => {
      if (userId !== userMessageId) {
        return;
      }

      const newMessages = messages.filter(
        (message) => message.id !== messageId
      );
      setMessages(newMessages);
    },
    [userId, messages, setMessages]
  );

  const editMessage = useCallback(
    (newMessage: string) => {
      if (!newMessage) {
        return;
      }

      const newMessages = messages.map((message) => {
        if (message.id !== id) {
          return;
        }

        return {
          ...message,
          message: newMessage,
        };
      });

      setMessages(newMessages as Message[]);
    },
    [messages, setMessages, id]
  );

  const handleModal = (): void => {
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        className="flex flex-row w-full"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
          },
        }}
      >
        {isReply && (
          <div className="flex h-full">
            <div className="bg-gray-200 w-1"></div>
          </div>
        )}
        <div
          className={`bg-white rounded-md p-6 items-center gap-1 ${isReply ? "md:ms-12 ms-4" : "w-full"}`}
        >
          <div className="flex flex-col gap-1 w-full">
            <div className="flex md:flex-row flex-col gap-3 mb-2 overflow-hidden items-center">
              <Like
                className="like-desktop"
                likes={likes}
                messageId={id}
                messages={messages}
                setMessages={setMessages}
              />
              <div className="flex flex-col gap-2 px-2 w-full">
                <div className="flex flex-row gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img
                      src={userData!.avatar}
                      alt={userData!.name}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={() => {
                        handleRedirectToProfile(userId);
                      }}
                    />
                    <span
                      className="font-bold cursor-pointer"
                      onClick={() => handleRedirectToProfile(userId)}
                    >
                      {userData!.name}
                    </span>
                    <TagYou isYou={isYou} />
                    <span className="text-sm text-gray-400">{date}</span>
                  </div>
                  <ButtonActions
                    className="desktop"
                    isYou={isYou}
                    setShowComment={setShowComment}
                    handleModal={handleModal}
                    setShowEditMessage={setShowEditMessage}
                  />
                </div>
                {showEditMessage ? (
                  <Textarea message={message} setMessage={editMessage} />
                ) : (
                  <p>{handleMessages(message)}</p>
                )}
              </div>
              <div className="w-full flex flex-row justify-between items-center mobile">
                <Like
                  className="like-mobile"
                  likes={likes}
                  messageId={id}
                  messages={messages}
                  setMessages={setMessages}
                />
                <ButtonActions
                  className="mobile"
                  isYou={isYou}
                  setShowComment={setShowComment}
                  handleModal={handleModal}
                  setShowEditMessage={setShowEditMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {showComment && (
        <Comment
          messageId={id}
          messages={messages}
          setMessages={setMessages}
          buttonText="Reply"
          setShowComment={setShowComment}
          showComment={showComment}
        />
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          deleteMessage={deleteMessage}
          userMessageId={userId}
          messageId={id}
        />
      )}
    </>
  );
};

export default Message;
