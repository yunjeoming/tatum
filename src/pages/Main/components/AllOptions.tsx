import { ChangeEvent, FC } from 'react';
import { CloseableSearchBox } from '@/components/molecules';
import { TreeView } from '@/components/organisms';
import { TreeNode } from '@/types/TreeNode';

type Props = {
  searchWord: string;
  options: TreeNode[];
  checkedItems: TreeNode['key'][];
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, node: TreeNode) => void;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};

const AllOptions: FC<Props> = ({ searchWord, options, checkedItems, onChangeCheckbox, onChangeValue, onDelete }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4>옵션 선택</h4>
      <CloseableSearchBox className="self-end" value={searchWord} onChange={onChangeValue} onDelete={onDelete} />
      <TreeView
        key={searchWord}
        datas={options}
        hasCounted
        expanded
        defaultExpanded={searchWord ? true : false}
        hasCheckbox
        checkedItems={checkedItems}
        onChangeCheckbox={onChangeCheckbox}
      />
    </div>
  );
};

export default AllOptions;
