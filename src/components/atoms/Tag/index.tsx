import { FC } from 'react';

export type Props = {
  className?: string;
  children: string | JSX.Element;
};

const Tag: FC<Props> = ({ className = '', children }) => {
  return (
    <div className={`w-fit text-xs text-gray-500 bg-gray-200 rounded-xl px-2 py-1 ${className ?? ''}`}>{children}</div>
  );
};

export default Tag;
