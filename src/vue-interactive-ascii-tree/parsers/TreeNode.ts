export class TreeNode {
  id: string
  name: string
  children: TreeNode[]

  constructor(name: string) {
    this.id = crypto.randomUUID()
    this.name = name
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
    const result: Record<string, unknown> = { name: this.name }

    if (this.hasChildren()) {
      result.children = this.children.map((child) => child.toJSON())
    }

    return result
  }
}
