import { type FC, memo } from "react";

import IconReply from "../../assets/images/icon-reply.svg";
import IconEdit from "../../assets/images/icon-edit.svg";
import IconDelete from "../../assets/images/icon-delete.svg";

interface ButtonActionsProps {
  readonly className?: string;
  readonly isYou: boolean;
  readonly setShowComment: (b: boolean) => void;
  readonly handleModal: () => void;
  readonly setShowEditMessage: (b: boolean) => void;
}

const ButtonActions: FC<ButtonActionsProps> = ({
  className = "",
  isYou,
  setShowComment,
  handleModal,
  setShowEditMessage,
}) => {
  return (
    <div className={`${className}`}>
      {!isYou ? (
        <button
          className="text-blue-800 font-bold hover:cursor-pointer flex items-center gap-2"
          onClick={() => setShowComment(true)}
        >
          <img src={IconReply} alt="Reply" />
          Reply
        </button>
      ) : (
        <div className="flex gap-6">
          <button
            className="text-red-800 font-bold hover:cursor-pointer flex items-center gap-2"
            onClick={handleModal}
          >
            <img src={IconDelete} alt="Reply" />
            Delete
          </button>
          <button 
            className="text-blue-800 font-bold hover:cursor-pointer flex items-center gap-2"
            onClick={() => setShowEditMessage(true)}
          >
            <img src={IconEdit} alt="Reply" />
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ButtonActions);
