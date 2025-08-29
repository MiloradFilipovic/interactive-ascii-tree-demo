export class AsciiUtils {
  static getPrefix(depth: number, isLast: boolean, ancestorIsLast: boolean[]): string {
    if (depth === 0) return ''

    let prefix = ''
    for (let i = 0; i < depth - 1; i++) {
      prefix += ancestorIsLast[i] ? '    ' : '│   '
    }
    prefix += isLast ? '└── ' : '├── '
    return prefix
  }
}
