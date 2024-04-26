import { AnimatePresence } from "framer-motion";
import { type FC, memo } from "react";

interface ModalProps {
  setShowModal: (show: boolean) => void;
  deleteMessage: (userMessageId: string, messageId: string) => void;
  readonly userMessageId: string;
  readonly messageId: string;
}

const Modal: FC<ModalProps> = ({
  setShowModal,
  deleteMessage,
  userMessageId,
  messageId,
}) => {
  const handleDelete = (): void => {
    deleteMessage(userMessageId, messageId);
    setShowModal(false);
  };

  return (
    <AnimatePresence
    >
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs p-2">
              <div className="flex flex-col p-4 md:p-5 gap-4">
                <h2 className="font-bold text-xl">Delete comment</h2>
                <h3 className="text-gray-500 text-start">
                  Are you sure you want to delete this comment? This will remove
                  the comment and can't be undone.
                </h3>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="py-2.5 px-4 font-medium text-white bg-gray-500 rounded-lg uppercase"
                    onClick={() => setShowModal(false)}
                  >
                    No, cancel
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-4 font-medium text-white bg-red-400 rounded-lg uppercase "
                    onClick={handleDelete}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default memo(Modal);
