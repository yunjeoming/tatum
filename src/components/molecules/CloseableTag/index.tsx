import { FC } from 'react';
import { Tag, CloseIcon } from '@/components/atoms';
import { Props as TagProps } from '@/components/atoms/Tag';

type Props = TagProps & {
  onClick: () => void;
};

const CloseableTag: FC<Props> = ({ onClick, children }) => {
  return (
    <Tag className="flex items-center gap-1">
      <>
        {children}
        <CloseIcon onClick={onClick} />
      </>
    </Tag>
  );
};

export default CloseableTag;
