import { type FC, memo } from "react";

interface ButtonsProps {
    readonly className?: string;
    readonly buttonText: string;
    readonly sendMessages: () => void;
    readonly setShowComment?: (b: boolean) => void;
    readonly messageId?: string;
}

const Buttons: FC<ButtonsProps> = ({
  className = "",
  buttonText,
  sendMessages,
  setShowComment,
  messageId,
}) => {
  return (
    <div className={`flex ${className}`}>
      <button
        className="bg-blue-900 text-white py-3 px-7 font-semibold rounded-md hover:cursor-pointer uppercase"
        onClick={sendMessages}
      >
        {buttonText}
      </button>
      {messageId && (
        <button
          className="py-3 px-7 text-sm rounded-md hover:cursor-pointer uppercase"
          onClick={() => setShowComment && setShowComment(false)}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default memo(Buttons);
