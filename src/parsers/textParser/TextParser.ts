import { BaseParser } from '@/parsers/BaseParser'
import type { ParsedLine, ParserOptions, StackEntry } from '@/parsers/types'
import { TreeNode } from '@/parsers/TreeNode'

export class TextParser extends BaseParser {
  private readonly tabWidth: number
  private readonly minIndentDiff: number

  constructor(options: ParserOptions = {}) {
    super()
    this.tabWidth = options.tabWidth || 4
    this.minIndentDiff = options.minIndentDiff || 1
  }

  private parseLines(input: string): ParsedLine[] {
    const lines = input.split(/\r?\n/)
    const parsedLines: ParsedLine[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.trim() === '') continue

      const indentAmount = this.measureIndentation(line)
      const content = line.trim()

      parsedLines.push({
        content,
        indentAmount,
        originalLineNumber: i + 1,
      })
    }

    return parsedLines
  }

  private measureIndentation(line: string): number {
    let indent = 0

    for (const char of line) {
      if (char === ' ') {
        indent += 1
      } else if (char === '\t') {
        indent = Math.floor((indent + this.tabWidth) / this.tabWidth) * this.tabWidth
      } else {
        break
      }
    }

    return indent
  }

  private buildTree(lines: ParsedLine[]): TreeNode[] {
    if (lines.length === 0) {
      throw new Error('No lines to build tree from')
    }

    const roots: TreeNode[] = []
    const stack: StackEntry[] = []

    for (const line of lines) {
      const node = new TreeNode(line.content)

      // Remove nodes from stack that have equal or greater indentation
      while (stack.length > 0 && line.indentAmount <= stack[stack.length - 1].indent) {
        stack.pop()
      }

      if (stack.length === 0) {
        // This is a root node
        roots.push(node)
      } else {
        // This is a child node
        const parent = stack[stack.length - 1]
        if (line.indentAmount - parent.indent < this.minIndentDiff) {
          // Treat as sibling instead of child
          stack.pop()
          // Find the real parent
          while (stack.length > 0 && stack[stack.length - 1].indent >= line.indentAmount) {
            stack.pop()
          }

          if (stack.length === 0) {
            // This becomes a new root
            roots.push(node)
          } else {
            stack[stack.length - 1].node.addChild(node)
          }
        } else {
          parent.node.addChild(node)
        }
      }

      stack.push({ node, indent: line.indentAmount })
    }

    return roots
  }

  parse(input: string): TreeNode[] {
    const lines = this.parseLines(input)

    if (lines.length === 0) {
      return []
    }
    return this.buildTree(lines)
  }
}
