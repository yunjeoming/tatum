import { FC, useState } from 'react';
import { Checkbox, ChevronIcon } from '@/components/atoms';
import { InputLabel } from '@/components/molecules';
import { TreeNode } from '@/types/TreeNode';
import TreeView, { Props as TreeViewProps } from './index';

type Props = Omit<TreeViewProps, 'depth' | 'datas'> & {
  node: TreeNode;
};

const TreeItem: FC<Props> = ({
  node,
  hasCounted = false,
  defaultExpanded = false,
  hasCheckbox = false,
  checkedItems,
  onChangeCheckbox,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleClickIcon = () => {
    setExpanded(prev => !prev);
  };

  const getLabel = (node: TreeNode) => {
    const { key, value, nodes } = node;
    const label = hasCounted && nodes?.length ? `${value} (${node.getSubKeyCount()})` : value;

    if (hasCheckbox) {
      const checked = node.hasAllInputKeys(checkedItems || []);
      const indeterminate = node.hasSomeInputKeys(checkedItems || []);

      return (
        <InputLabel
          label={label}
          input={
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={e => onChangeCheckbox && onChangeCheckbox(e, node)}
              name={key}
            />
          }
        />
      );
    }

    return <>{label}</>;
  };

  const getOptimizedItems = (node: TreeNode) => {
    if (hasCheckbox) {
      const nonChecked = node.hasNoInputKeys(checkedItems || []);
      return nonChecked ? undefined : checkedItems;
    }
    return checkedItems;
  };

  return (
    <li>
      <div className={`flex items-center gap-1 border-b py-1 ${node.nodes ? 'cursor-pointer' : ''}`}>
        <span className="w-4 flex items-center justify-center" onClick={handleClickIcon}>
          {node.nodes ? <ChevronIcon expanded={expanded} /> : '◦'}
        </span>
        {getLabel(node)}
      </div>
      {node.nodes && (
        <TreeView
          depth={1}
          datas={node.nodes}
          hasCounted={hasCounted}
          expanded={expanded}
          defaultExpanded={defaultExpanded}
          hasCheckbox={hasCheckbox}
          checkedItems={getOptimizedItems(node)}
          onChangeCheckbox={onChangeCheckbox}
        />
      )}
    </li>
  );
};

export default TreeItem;
