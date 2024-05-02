import { ChangeEvent, FC } from 'react';
import { TreeNode } from '@/types/TreeNode';
import TreeItem from './TreeItem';

export type Props = {
  depth?: number;
  datas: TreeNode[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  hasCounted?: boolean;
  hasCheckbox?: boolean;
  checkedItems?: TreeNode['key'][];
  onChangeCheckbox?: (e: ChangeEvent<HTMLInputElement>, node: TreeNode) => void;
};

const TreeView: FC<Props> = ({ depth = 0, datas, expanded = false, ...others }) => {
  return (
    <ul className={`text-sm ${depth ? 'pl-4' : 'pl-0'} ${expanded ? '' : 'max-h-0 overflow-hidden'}`}>
      {datas.map(node => (
        <TreeItem key={node.key} node={node} expanded={expanded} {...others} />
      ))}
    </ul>
  );
};

export default TreeView;
