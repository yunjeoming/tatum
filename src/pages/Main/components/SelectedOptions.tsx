import { FC } from 'react';
import { Tag } from '@/components/atoms';
import { CloseableTag } from '@/components/molecules';
import { TreeNode } from '@/types/TreeNode';

type Props = {
  totalCount: number;
  selectedCount: number;
  options: TreeNode[];
  onDeleteOption: (node: TreeNode) => void;
};

const SelectedOptions: FC<Props> = ({ totalCount, selectedCount, options, onDeleteOption }) => {
  const getEmphasizedPath = (node: TreeNode) => {
    let path = node.getPath({ hasRootPath: false });
    const checkedAll = node.nodes?.length ? ':all' : '';
    const count = node.getSubKeyCount();
    if (!checkedAll) {
      const lastIndex = path.lastIndexOf(TreeNode.PATH_SEPERATOR);
      const lastPathname = path.slice(lastIndex + TreeNode.PATH_SEPERATOR.length);
      const newPath = path.replace(lastPathname, '');
      return (
        <span>
          <strong>{newPath}</strong>
          {lastPathname} ({count})
        </span>
      );
    }
    return (
      <span>
        <strong>{path}</strong>
        {checkedAll} ({count})
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h4>선택된 옵션</h4>
      <Tag>
        <span>
          {selectedCount} / <strong>{totalCount}</strong> selected
        </span>
      </Tag>
      <span className="border-t" />
      {options.map(option => (
        <CloseableTag key={option.key} onClick={() => onDeleteOption(option)}>
          {getEmphasizedPath(option)}
        </CloseableTag>
      ))}
    </div>
  );
};

export default SelectedOptions;
