import { FC } from 'react';

type Props = {
  expanded?: boolean;
};

const ChevronIcon: FC<Props> = ({ expanded = false }) => {
  return (
    <span
      className={`w-fit text-xs ${expanded ? 'rotate-90' : 'rotate-0'} transition-transform cursor-pointer`}
      aria-expanded={expanded}
    >
      {'>'}
    </span>
  );
};

export default ChevronIcon;
