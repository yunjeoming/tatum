import { FC, useState } from 'react';
import { ChevronIcon } from '@/components/atoms';
import { TreeNodeProperties } from '@/types/TreeNode';
import TreeView, { Props as TreeViewProps } from './index';

type Props = TreeNodeProperties &
  Pick<TreeViewProps, 'checkboxOptions' | 'counted'> & {
    label: string | JSX.Element;
  };

const TreeItem: FC<Props> = ({ label, value, nodes, counted, checkboxOptions }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClickIcon = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <li>
      <div className={`flex items-center gap-1 ${nodes ? 'cursor-pointer' : ''} border-b py-1`}>
        <span className="w-4 flex items-center justify-center" onClick={handleClickIcon}>
          {nodes ? <ChevronIcon expanded={expanded} /> : '◦'}
        </span>
        {label}
      </div>
      {nodes && (
        <TreeView depth={1} data={nodes} checkboxOptions={checkboxOptions} counted={counted} expanded={expanded} />
      )}
    </li>
  );
};

export default TreeItem;
