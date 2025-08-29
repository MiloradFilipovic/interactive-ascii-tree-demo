import type { TreeNode } from '@/parsers/TreeNode'

export abstract class BaseTreeGenerator<T> {
  constructor() {}

  abstract renderTree(nodes: TreeNode[]): T

  protected traverse(
    nodes: TreeNode[],
    callback: (node: TreeNode, depth: number, index: number, isLast: boolean) => void,
    depth: number = 0,
  ): void {
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1
      callback(node, depth, index, isLast)

      if (node.children?.length) {
        this.traverse(node.children, callback, depth + 1)
      }
    })
  }
}
