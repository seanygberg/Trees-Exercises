/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      return 0;
    };

    function getMinDepth(node) {
      if (node.left === null && node.right === null) {
        return 1;
      }
      if (node.left === null) {
        return getMinDepth(node.right) + 1;
      } 
      if (node.right === null) {
        return getMinDepth(node.left) + 1;
      }
      return (
        Math.min(getMinDepth(node.left), getMinDepth(node.right)) + 1
      );
    }

    return getMinDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) {
      return 0;
    };

    function getMaxDepth(node) {
      if (node.left === null && node.right === null) {
        return 1;
      }
      if (node.left === null) {
        return getMaxDepth(node.right) + 1;
      } 
      if (node.right === null) {
        return getMaxDepth(node.left) + 1;
      }
      return (
        Math.max(getMaxDepth(node.left), getMaxDepth(node.right)) + 1
      );
    }

    return getMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function getMaxSum(node) {
      if (node === null) {
        return 0;
      }

      const leftSum = getMaxSum(node.left);
      const rightSum = getMaxSum(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    getMaxSum(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }

    let stack = [this.root];
    let result = null;

    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode.val > lowerBound && (result === null || currentNode.val < result)) {
        result = currentNode.val;
      }
      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      } 
    }

    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) {
      return false;
    }

    function getInfo(nodeToFind, curNode, level = 0, data = { level: 0, parent: null }) {
      if (data.parent) {
        return data;
      }
      if (curNode.left === nodeToFind || curNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = curNode;
      }
      if (curNode.left) {
        getInfo(nodeToFind, curNode.left, level + 1, data);
      }
      if (curNode.right) {
        getInfo(nodeToFind, curNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = getInfo(node1, this.root);
    let node2Info = getInfo(node2, this.root);

    let sameLevel = node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents = node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const values = [];

    function traverse(node) {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }

    traverse(tree.root);
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) {
      return null;
    }

    const values = stringTree.split(" ");

    function buildTree() {
      if (values.length) {
        const curVal = values.shift();
        if (curVal === "#") return null;

        let curNode = new BinaryTreeNode(parseInt(curVal));
        curNode.left = buildTree();
        curNode.right = buildTree();

        return curNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, curNode=this.root) {
    if (curNode === null) {
      return null;
    }
    
    if (curNode === node1 || curNode === node2) {
      return curNode;
    }

    const left = this.lowestCommonAncestor(node1, node2, curNode.left);

    const right = this.lowestCommonAncestor(node1, node2, curNode.right);

    if (left !== null && right !== null) {
      return curNode;
    }

    if (left !== null || right !== null) {
      return left || right;
    }

    if (left === null && right === null) {
      return null;
    }

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
