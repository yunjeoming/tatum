export type TreeNodeProperties = Pick<TreeNode, 'key' | 'value' | 'nodes'>;

export class TreeNode {
  static PATH_SEPERATOR = ' > ';

  nodes?: TreeNode[];

  private parent?: TreeNode;
  private path: string = '';
  private subKeys: TreeNode['key'][] = [];

  constructor(public key: string, public value: string, parent?: TreeNode) {
    this.key = key;
    this.value = value;
    this.path = value;
    if (parent) {
      this.parent = parent;
      this.path = `${parent.getPath()}${TreeNode.PATH_SEPERATOR}${value}`;
    }
  }

  addChildNode(newNode: TreeNode) {
    if (!this.nodes) {
      this.nodes = [];
    }

    this.nodes.push(newNode);
  }

  getChildNodeByKey(key: TreeNode['key']) {
    return this.nodes?.find((node) => node.key === key);
  }

  getSubKeyCount(): number {
    const subKeys = this.getSubKeys();
    return subKeys.length;
  }

  getSubKeys(): TreeNode['key'][] {
    if (!this.subKeys.length) {
      this.subKeys = this.getChildrenSubKeys();
    }
    return this.subKeys;
  }

  getParent() {
    return this.parent;
  }

  getPath(options: { hasRootPath?: boolean } = {}) {
    const { hasRootPath = true } = options;
    return hasRootPath ? this.path : this.path.split(TreeNode.PATH_SEPERATOR).slice(1).join(TreeNode.PATH_SEPERATOR);
  }

  searchChildNode(searchWord: string) {
    const isIncluded = this.value.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase());

    if (!this.nodes) {
      return isIncluded ? this : null;
    }

    if (isIncluded) {
      return this;
    }

    this.nodes = this.nodes.reduce<TreeNode[]>((prev, node) => {
      const targetNode = node.searchChildNode(searchWord);
      if (targetNode) {
        prev.push(targetNode);
      }
      return prev;
    }, []);

    return this.nodes.length ? this : null;
  }

  cloneDeep(): TreeNode {
    const newNode = new TreeNode(this.key, this.value, this.parent);
    newNode.nodes = this.nodes;

    if (!newNode.nodes) {
      return new TreeNode(this.key, this.value, this.parent);
    }

    newNode.nodes = newNode.nodes.map((node) => node.cloneDeep());

    return newNode;
  }

  hasAllInputKeys(inputKeys: TreeNode['key'][]) {
    if (!inputKeys.length) {
      return false;
    }

    const keyLength = this.getSubKeys().length;
    const includedCount = this.getIncludedKeys(inputKeys).length;
    return 0 < includedCount && includedCount === keyLength;
  }

  hasSomeInputKeys(inputKeys: TreeNode['key'][]) {
    if (!inputKeys.length) {
      return false;
    }

    const keyLength = this.getSubKeys().length;
    const includedCount = this.getIncludedKeys(inputKeys).length;
    return 0 < includedCount && includedCount < keyLength;
  }

  hasNoInputKeys(inputKeys: TreeNode['key'][]) {
    if (!inputKeys.length) {
      return false;
    }

    const includedCount = this.getIncludedKeys(inputKeys).length;
    return 0 === includedCount;
  }

  getIncludedKeys(inputKeys: TreeNode['key'][]) {
    const inputSet = new Set(inputKeys);
    const keySet = new Set(this.getSubKeys());

    const includedKeys = [] as typeof inputKeys;
    keySet.forEach((key) => {
      if (inputSet.has(key)) {
        includedKeys.push(key);
      }
    });

    return includedKeys;
  }

  private getChildrenSubKeys() {
    if (!this?.nodes || this.nodes.length < 1) {
      return [this.key];
    }

    return this.nodes.reduce<TreeNode['key'][]>((prev, curr) => {
      prev.push(...curr.getChildrenSubKeys());
      return prev;
    }, []);
  }
}
