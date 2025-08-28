import type { TreeNode } from '@/vue-interactive-ascii-tree/parsers/TreeNode'

interface ParserWarning {
  line?: number
  path?: string
  message: string
  type:
    | 'large_jump'
    | 'negative_indent'
    | 'ambiguous_sibling'
    | 'validation_error'
    | 'missing_field'
}

export abstract class BaseParser {
  protected warnings: ParserWarning[] = []

  abstract parse(input: string): TreeNode[]

  render(tree: TreeNode[]): string {
    return this.generateAsciiTree(tree).join('\n')
  }

  getWarnings(): ParserWarning[] {
    return [...this.warnings]
  }

  clearWarnings(): void {
    this.warnings = []
  }

  protected generateAsciiTree(
    nodes: TreeNode[],
    prefix: string = '',
    isRootLevel: boolean = true,
  ): string[] {
    const result: string[] = []
    nodes.forEach((node, index) => {
      if (prefix === '' && isRootLevel) {
        // Root node - no connector
        result.push(node.name)
        if (node.hasChildren()) {
          // Children of root nodes get normal tree connectors
          result.push(...this.generateAsciiTree(node.children, '', false))
        }
      } else {
        const isLast = index === nodes.length - 1
        const connector = isLast ? '└── ' : '├── '
        const extension = isLast ? '    ' : '│   '

        result.push(`${prefix}${connector}${node.name}`)
        if (node.hasChildren()) {
          const childPrefix = prefix + extension
          result.push(...this.generateAsciiTree(node.children, childPrefix, false))
        }
      }
    })
    return result
  }
}
