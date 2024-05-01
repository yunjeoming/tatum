import { ChangeEvent, FC } from 'react';
import { Checkbox } from '@/components/atoms';
import { InputLabel } from '@/components/molecules';
import { TreeNode } from '@/types/TreeNode';
import TreeItem from './TreeItem';

export type Props = {
  depth?: number;
  data: TreeNode[];
  expanded?: boolean;
  counted?: boolean;
  checkboxOptions?: {
    checkedItems: TreeNode['key'][];
    onChange: (e: ChangeEvent<HTMLInputElement>, node: TreeNode) => void;
  };
};

const TreeView: FC<Props> = ({ depth = 0, data, expanded = true, checkboxOptions, counted }) => {
  const getLabel = (node: TreeNode) => {
    const { key, value, nodes } = node;
    const label = counted && nodes?.length ? `${value} (${node.getCount()})` : value;

    if (checkboxOptions) {
      const { checkedItems, onChange } = checkboxOptions;
      const checked = node.hasAllInputKeys(checkedItems);
      const indeterminate = node.hasSomeInputKeys(checkedItems);

      return (
        <InputLabel
          label={label}
          input={
            <Checkbox checked={checked} indeterminate={indeterminate} onChange={(e) => onChange(e, node)} name={key} />
          }
        />
      );
    }

    return <>{label}</>;
  };

  return (
    <ul className={`text-sm ${depth ? 'pl-4' : 'pl-0'} ${expanded ? 'max-h-[1000px]' : 'max-h-0 overflow-hidden'}`}>
      {data.map((node) => {
        const { key, ...others } = node;
        return (
          <TreeItem key={key} label={getLabel(node)} counted={counted} checkboxOptions={checkboxOptions} {...others} />
        );
      })}
    </ul>
  );
};

export default TreeView;
