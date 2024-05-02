import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Column, OriginData, Row } from '@/types/common';
import { TreeNode } from '@/types/TreeNode';

type UseHookReturn = {
  nodeData: TreeNode | null;
  checkedNodes: TreeNode[];
  checkedKeys: TreeNode['key'][];
  columns: Column[];
  rows: Row[];
  searchWord: string;
  totalCount: number;
  handleChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, node: TreeNode) => void;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteOption: (node: TreeNode) => void;
  handleDeleteSearchWord: () => void;
};

const useMain = (): UseHookReturn => {
  const mapData = useRef<OriginData>({});
  const originNode = useRef<TreeNode>(new TreeNode('root', 'root'));

  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [checkedKeys, setCheckedDatas] = useState<TreeNode['key'][]>([]);
  const [checkedNodes, setCheckedNodes] = useState<TreeNode[]>([]);
  const [nodeData, setNodeDatas] = useState<TreeNode | null>(originNode.current);

  const [searchWord, setSearchWord] = useState('');

  const convertColumn = (column: string) => {
    const keys = column.split(',');

    return keys
      .map(key => ({
        key,
        title: key,
      }))
      .filter(key => !key.key.toLocaleLowerCase().includes('id'));
  };

  const convertMapData = (rows: string[]) => {
    const [column, ...datas] = rows;
    const columnKeys = column.split(',');

    return datas.reduce<OriginData>((prev, data) => {
      let originData = {};
      const keys = data.split(',');
      const id = keys[0];

      columnKeys.forEach((columnKey, columnIndex) => {
        originData = {
          ...originData,
          [columnKey]: keys[columnIndex],
        };
      });

      prev[id] = originData;
      return prev;
    }, {});
  };

  const convertNodeData = (rows: string[]) => {
    const recursiveNode = (inputs: string[], policyId: string, parent: TreeNode) => {
      const category = inputs[0];

      if (inputs.length === 1 && parent) {
        const nameNode = new TreeNode(policyId, category, parent);
        parent.addChildNode(nameNode);
        return;
      }

      if (!category) {
        recursiveNode(inputs.slice(1), policyId, parent);
        return;
      }

      const targetNode = parent.getChildNodeByKey(category);

      if (targetNode) {
        recursiveNode(inputs.slice(1), policyId, targetNode);
      } else {
        const newNode = new TreeNode(category, category, parent);
        parent.addChildNode(newNode);
        recursiveNode(inputs.slice(1), policyId, newNode);
      }
    };

    const [_, ...datas] = rows;

    const baseNode = new TreeNode('root', 'root');
    const rootNode = datas.reduce<TreeNode>((prev, data) => {
      const [policyId, ...inputs] = data.split(',');
      recursiveNode(inputs, policyId, prev);
      return prev;
    }, baseNode);

    return rootNode;
  };

  const getLastCheckedNodes = (node: TreeNode, inputKeys: TreeNode['key'][]) => {
    if (node.hasNoInputKeys(inputKeys)) {
      return;
    }

    if (node.hasAllInputKeys(inputKeys)) {
      return [node];
    }

    return node.nodes?.reduce<TreeNode[]>((prev, node) => {
      const checkedNodes = getLastCheckedNodes(node, inputKeys);
      if (checkedNodes) {
        prev.push(...checkedNodes);
      }
      return prev;
    }, []);
  };

  useEffect(() => {
    fetch('/fe_test_tree_view_selector.csv')
      .then(res => res.text())
      .then(text => {
        const rowData = text.trim().split('\r\n');
        const columns = convertColumn(rowData[0]);
        const newMapData = convertMapData(rowData);
        const nodeData = convertNodeData(rowData);
        mapData.current = newMapData;
        originNode.current = nodeData;
        setColumns(columns);
        setNodeDatas(nodeData);
      })
      .catch((e: any) => {
        console.error('csv를 불러올 수 없습니다. ', e);
      });
  }, []);

  useEffect(() => {
    const newSelectedOptions = checkedKeys.map(key => {
      return mapData.current[key];
    });
    setRows(newSelectedOptions);

    const checkedNodes = getLastCheckedNodes(originNode.current, checkedKeys) || [];
    setCheckedNodes(checkedNodes);

    // eslint-disable-next-line
  }, [checkedKeys]);

  const handleChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>, node: TreeNode) => {
    const { checked } = e.target;
    const inputItems = node.getSubKeys();
    setCheckedDatas(prev => {
      if (checked) {
        const newItems = new Set([...prev, ...inputItems]);
        return Array.from(newItems).sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
      }
      return prev.filter(item => !inputItems.includes(item));
    });
  }, []);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setSearchWord(searchWord);

    const originData = originNode.current.cloneDeep();
    const searchedData = originData.searchChildNode(searchWord);
    setNodeDatas(searchedData);
  };

  const handleDeleteOption = (node: TreeNode) => {
    const inputItems = node.getSubKeys();
    setCheckedDatas(prev => {
      return prev.filter(item => !inputItems.includes(item));
    });
  };

  const handleDeleteSearchWord = () => {
    setSearchWord('');
    setNodeDatas(originNode.current);
  };

  return {
    nodeData,
    checkedKeys,
    checkedNodes,
    columns,
    rows,
    searchWord,
    totalCount: originNode.current.getSubKeyCount(),
    handleChangeCheckbox,
    handleChangeValue,
    handleDeleteOption,
    handleDeleteSearchWord,
  };
};

export default useMain;
