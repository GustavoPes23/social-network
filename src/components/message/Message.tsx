import { type FC, useState, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";

import "./styles.scss";

import type { Message } from "../../utils/messages";

import { users, you } from "../../utils/users";

import Like from "../like/Like";
import Comment from "../comment/Comment";
import Modal from "../modal/Modal";
import ButtonActions from "./ButtonActions";
import TagYou from "./TagYou";
import Avatar from "./Avatar";
import Name from "./Name";
import Content from "./Content";
import Date from "./Date";

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
  const [messageEdit, setMessageEdit] = useState<string>(message);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isReply = messageId && !uniqueMessage;

  const userData = users.find((user) => user.id === userId);
  const isYou = userId === you.id;

  const handleRedirectToProfile = (userId: string): void => {
    redirectToProfile(userId);
    setIsFiltered(true);
    setUniqueMessage(true);
  };

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

  const editMessage = useCallback(() => {
    if (!messageEdit) {
      return;
    }

    const newMessages = messages.map((message) => {
      if (message.id !== id) {
        return message;
      }

      return {
        ...message,
        message: messageEdit,
      };
    });

    setMessages(newMessages as Message[]);
  }, [messages, setMessages, id, messageEdit]);

  const handleModal = (): void => {
    setShowModal(true);
  };

  const loadingData = (): void => {
    if (!isLoading) {
      return;
    }

    setInterval(() => {
      setIsLoading(!isLoading);
    }, 1000);
  };

  useEffect(() => {
    loadingData();
  }, []);

  return (
    <>
      <motion.div
        className="flex flex-row w-full"
        transition={{ type: "spring", stiffness: 100 }}
        variants={{
          hidden: {
            y: 20,
            opacity: 0,
          },
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
          className={`bg-white rounded-md p-6 items-center gap-1 w-full ${
            isReply ? "md:ms-10 ms-4" : "" }`}
        >
          <div className="flex flex-col gap-1 w-full">
            <div className="flex md:flex-row flex-col gap-3 mb-2 overflow-hidden items-center">
              <Like
                className="like-desktop"
                likes={likes}
                messageId={id}
                messages={messages}
                setMessages={setMessages}
                isLoading={isLoading}
              />
              <div className="flex flex-col gap-2 px-2 w-full">
                <div className="flex flex-row gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <Avatar
                      isLoading={isLoading}
                      avatar={userData!.avatar}
                      name={userData!.name}
                      userId={userId}
                      handleRedirectToProfile={handleRedirectToProfile}
                    />
                    <Name
                      isLoading={isLoading}
                      name={userData!.name}
                      userId={userId}
                      handleRedirectToProfile={handleRedirectToProfile}
                    />
                    {!isLoading && <TagYou isYou={isYou} />}
                    <Date date={date} isLoading={isLoading} />
                  </div>
                  <ButtonActions
                    className="desktop"
                    isYou={isYou}
                    setShowComment={setShowComment}
                    handleModal={handleModal}
                    setShowEditMessage={setShowEditMessage}
                    showEditMessage={showEditMessage}
                    editMessage={editMessage}
                    isLoading={isLoading}
                  />
                </div>
                <Content
                  showEditMessage={showEditMessage}
                  message={message}
                  messageEdit={messageEdit}
                  setMessageEdit={setMessageEdit}
                  handleRedirectToProfile={handleRedirectToProfile}
                  isLoading={isLoading}
                />
              </div>
              <div className={`w-full flex flex-row justify-between items-center mobile ${isLoading && "px-2"}`}>
                <Like
                  className="like-mobile"
                  likes={likes}
                  messageId={id}
                  messages={messages}
                  setMessages={setMessages}
                  isLoading={isLoading}
                />
                <ButtonActions
                  className="mobile"
                  isYou={isYou}
                  setShowComment={setShowComment}
                  handleModal={handleModal}
                  setShowEditMessage={setShowEditMessage}
                  showEditMessage={showEditMessage}
                  editMessage={editMessage}
                  isLoading={isLoading}
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

export default memo(Message);
