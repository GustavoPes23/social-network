import { type FC, memo } from "react";

interface DateProps {
  readonly isLoading: boolean;
  readonly date: string;
}

const Date: FC<DateProps> = ({ isLoading, date }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="md:w-20 w-12 h-2 bg-gray-200 rounded-full mb-2"></div>
      </div>
    );
  }

  return <span className="text-sm text-gray-400">{date}</span>;
};

export default memo(Date);
