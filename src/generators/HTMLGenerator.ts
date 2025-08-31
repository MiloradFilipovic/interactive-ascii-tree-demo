import { BaseTreeGenerator } from '@/generators/BaseTreeGenerator'
import type { TreeNode } from '@/parsers/TreeNode'
import { HtmlUtils } from '@/generators/utils/HTMLUtils'

export type HtmlGeneratorOptions = {
  defaultOpen?: boolean
  includeStyles?: boolean
  includeWrapper?: boolean
  minified?: boolean
  indentSize?: number
}

export class HTMLGenerator extends BaseTreeGenerator<string> {
  private defaultOpen: boolean
  private minified: boolean
  private indentSize: number

  constructor(options: HtmlGeneratorOptions = {}) {
    super()
    this.defaultOpen = options.defaultOpen ?? true
    this.minified = options.minified ?? false
    this.indentSize = options.indentSize ?? 2
  }

  renderTree(nodes: TreeNode[], theme?: string): string {
    const tree = this.renderNodes(nodes, 0)
    return `<ul class="interactive-ascii-tree" data-theme="${theme ?? 'light'}">\n${tree}\n</ul>`
  }

  private renderNodes(nodes: TreeNode[], depth: number): string {
    const indent = this.getIndent(depth + 1)

    return nodes.map((node) => indent + this.renderNode(node, depth)).join('\n')
  }

  private renderNode(node: TreeNode, depth: number): string {
    const escaped = HtmlUtils.escape(node.name)
    const indent = this.getIndent(depth + 1)
    const innerIndent = this.getIndent(depth + 2)

    if (!node.children?.length) {
      return `<li><span>${escaped}</span></li>`
    }

    const openAttr = this.defaultOpen ? ' open' : ''
    return `<li>
${innerIndent}<details${openAttr}>
${innerIndent}  <summary>${escaped}</summary>
${innerIndent}  <ul>
${this.renderNodes(node.children, depth + 3)}
${innerIndent}  </ul>
${innerIndent}</details>
${indent}</li>`
  }

  private getIndent(level: number): string {
    return this.minified ? '' : ' '.repeat(level * this.indentSize)
  }
}
