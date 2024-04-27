import { type FC, memo } from "react";

import IconReply from "../../assets/images/icon-reply.svg";
import IconEdit from "../../assets/images/icon-edit.svg";
import IconDelete from "../../assets/images/icon-delete.svg";
import { motion } from "framer-motion";

interface ButtonActionsProps {
  readonly className?: string;
  readonly isYou: boolean;
  readonly setShowComment: (b: boolean) => void;
  readonly handleModal: () => void;
  readonly setShowEditMessage: (b: boolean) => void;
  readonly showEditMessage: boolean;
  readonly editMessage: () => void;
  readonly isLoading: boolean;
}

const ButtonActions: FC<ButtonActionsProps> = ({
  className = "",
  isYou,
  setShowComment,
  handleModal,
  setShowEditMessage,
  showEditMessage,
  editMessage,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="md:w-20 w-10 h-2 bg-gray-200 rounded-full mb-2"></div>
      </div>
    );
  }

  if (!isYou) {
    return (
      <div className={`${className}`}>
        <motion.button
          className="text-blue-800 font-bold hover:cursor-pointer flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          onClick={() => setShowComment(true)}
        >
          <img src={IconReply} alt="Reply" />
          Reply
        </motion.button>
      </div>
    );
  }

  const handleEdit = () => {
    if (!showEditMessage) {
      return setShowEditMessage(true);
    }

    setShowEditMessage(false);
    return editMessage();
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="text-red-800 font-bold hover:cursor-pointer flex items-center gap-2"
          onClick={handleModal}
        >
          <img src={IconDelete} alt="Reply" />
          Delete
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="text-blue-800 font-bold hover:cursor-pointer flex items-center gap-2"
          onClick={() => handleEdit()}
        >
          <img src={IconEdit} alt="Reply" />
          {showEditMessage ? "Done" : "Edit"}
        </motion.button>
      </div>
    </div>
  );
};

export default memo(ButtonActions);
