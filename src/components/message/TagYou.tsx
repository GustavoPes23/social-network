import { type FC, memo } from "react";

interface TagYouProps {
    readonly isYou: boolean;
}

const TagYou: FC<TagYouProps> = ({ isYou }) => {
  return (
    <>
      {isYou && (
        <div className="bg-indigo-800 px-2 py-1/2 rounded me-2">
          <span className="text-sm text-white lowercase">you</span>
        </div>
      )}
    </>
  );
};

export default memo(TagYou);
