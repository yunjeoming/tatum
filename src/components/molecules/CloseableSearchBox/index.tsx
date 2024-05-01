import { FC } from 'react';
import { CloseIcon, SearchBox } from '@/components/atoms';
import { Props as SearchBoxProps } from '@/components/atoms/SearchBox';

type Props = SearchBoxProps & {
  onDelete: () => void;
};

const CloseableSearchBox: FC<Props> = ({ className = '', onDelete, ...others }) => {
  return (
    <div className={`relative ${className ?? ''}`}>
      <SearchBox className="pr-6" {...others} />
      <CloseIcon className="absolute top-1/2 right-1 -translate-y-1/2" onClick={onDelete} />
    </div>
  );
};

export default CloseableSearchBox;
