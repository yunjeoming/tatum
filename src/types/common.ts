import { TreeNode } from './TreeNode';

export type Column = {
  key: string;
  title: string;
};

export type Row = {
  [key: string]: string;
};

export type Data = {
  [key: Column['key']]: string;
};

export type OriginData = {
  [key: TreeNode['key']]: Data;
};
