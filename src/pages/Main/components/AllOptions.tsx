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
  const noSearchResult = searchWord && !options.length ? true : false;

  return (
    <div className="flex flex-col gap-4 min-h-[460px]">
      <h4>옵션 선택</h4>
      <CloseableSearchBox className="self-end" value={searchWord} onChange={onChangeValue} onDelete={onDelete} />
      {noSearchResult ? (
        <div className="text-sm text-center pt-12">검색 결과가 없습니다.</div>
      ) : (
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
      )}
    </div>
  );
};

export default AllOptions;
