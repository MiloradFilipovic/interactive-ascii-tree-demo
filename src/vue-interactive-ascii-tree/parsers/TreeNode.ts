export class TreeNode {
  content: string
  children: TreeNode[]

  constructor(content: string) {
    this.content = content
    this.children = []
  }

  addChild(child: TreeNode) {
    this.children.push(child)
  }

  hasChildren(): boolean {
    return this.children.length > 0
  }

  getDepth(): number {
    if (!this.hasChildren()) {
      return 0
    }

    const childDepths = this.children.map((child) => child.getDepth())
    return 1 + Math.max(...childDepths)
  }

  toJSON(): Record<string, unknown> {
    const result: Record<string, unknown> = { name: this.content }

    if (this.hasChildren()) {
      result.children = this.children.map((child) => child.toJSON())
    }

    return result
  }
}
