import { type FC, memo } from "react";

interface TextareaProps {
    readonly message: string;
    readonly setMessage: (message: string) => void;
}

const Textarea: FC<TextareaProps> = ({ message, setMessage }) => {
  return (
    <textarea
      className="border py-3 px-4 resize-none rounded-md justify-self-stretch w-full"
      placeholder="Add a comment..."
      onChange={(e) => setMessage(e.target.value)}
      value={message}
    />
  );
};

export default memo(Textarea);
