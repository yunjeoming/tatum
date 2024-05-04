import { FC } from 'react';

type Props = {
  className?: string;
};

const LoadingUI: FC<Props> = ({ className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-center gap-2 ${className ?? ''}`}>
      <span className="animate-[pulse_1s_infinite] w-2 h-2 rounded-full bg-gray-700"></span>
      <span className="animate-[pulse_1s_infinite_200ms] w-2 h-2 rounded-full bg-gray-700"></span>
      <span className="animate-[pulse_1s_infinite_400ms] w-2 h-2 rounded-full bg-gray-700"></span>
    </div>
  );
};

export default LoadingUI;
