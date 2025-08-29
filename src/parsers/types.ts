import type { TreeNode } from '@/vue-interactive-ascii-tree/parsers/TreeNode'

export type ParsedLine = {
  content: string
  indentAmount: number
  originalLineNumber: number
}

export type ParserOptions = {
  tabWidth?: number
  minIndentDiff?: number
}

export type StackEntry = {
  node: TreeNode
  indent: number
}

export type InputFormat = 'auto' | 'text' | 'json'
