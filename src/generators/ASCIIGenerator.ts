import { BaseTreeGenerator } from '@/generators/BaseTreeGenerator'
import type { TreeNode } from '@/parsers/TreeNode'
import { AsciiUtils } from '@/generators/utils/ASCIIUtils'

export class AsciiGenerator extends BaseTreeGenerator<string> {
  constructor() {
    super()
  }

  renderTree(nodes: TreeNode[]): string {
    const lines: string[] = []
    nodes.forEach((node) => {
      lines.push(node.name)
      if (node.children?.length) {
        this.renderNodes(node.children, 1, [], lines)
      }
    })
    return lines.join('\n')
  }

  private renderNodes(
    nodes: TreeNode[],
    depth: number,
    ancestorIsLast: boolean[],
    lines: string[],
  ): void {
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1
      const prefix = AsciiUtils.getPrefix(depth, isLast, ancestorIsLast)

      lines.push(prefix + node.name)

      if (node.children?.length) {
        this.renderNodes(node.children, depth + 1, [...ancestorIsLast, isLast], lines)
      }
    })
  }
}
