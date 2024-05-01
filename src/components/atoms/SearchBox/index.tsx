import { FC, InputHTMLAttributes } from 'react';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const SearchBox: FC<Props> = ({ className = '', placeholder = 'Search', ...others }) => {
  return (
    <input
      type="text"
      className={`text-sm px-2 py-1 border rounded-sm ${className ?? ''}`}
      placeholder={placeholder}
      {...others}
    />
  );
};

export default SearchBox;
