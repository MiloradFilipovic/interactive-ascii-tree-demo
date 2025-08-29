import type { TreeNode } from '@/parsers/TreeNode'

export abstract class BaseParser {
  abstract parse(input: string): TreeNode[]
}
