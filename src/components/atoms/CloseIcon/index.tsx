import { FC } from 'react';

type Props = {
  className?: string;
  onClick: () => void;
};

const CloseIcon: FC<Props> = ({ className = '', onClick }) => {
  return (
    <span
      className={`w-fit text-xs text-gray-600 transition-transform cursor-pointer px-1 hover:text-gray-400 ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {'✕'}
    </span>
  );
};

export default CloseIcon;
