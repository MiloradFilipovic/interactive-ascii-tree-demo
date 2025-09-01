export const TREE_CSS = `.interactive-ascii-tree {
  --background-color: #ffffff;
  --background-muted: #eeeeee;
  --text-color: #222222;
  --text-color-muted: #999999;

  &[data-theme='dark'] {
    --background-color: #222222;
    --background-muted: #555555;
    --text-color: #ffffff;
    --text-color-muted: #aaaaaa;
  }

  --indent: 4ch;
  --v-line: '│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A│\\A';

  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1;
  font-family: "Consolas", "Menlo", "DejaVu Sans Mono", "Lucida Console", monospace;
  color: var(--text-color);
  background-color: var(--background-color);

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding-top: 6px;
    position: relative;
  }

  li li {
    padding-left: var(--indent);
  }

  li li > *:first-child::before {
    content: '├── ';
    color: var(--text-color-muted);
    position: absolute;
    left: 0;
  }

  li li:last-child > *:first-child::before {
    content: '└── ';
  }

  li li::after {
    content: var(--v-line);
    color: var(--text-color-muted);
    position: absolute;
    left: 0;
    top: 1.4em;
    white-space: pre-line;
    line-height: 1;
    pointer-events: none;
    overflow: hidden;
    height: calc(100% - 1.4em);
  }

  li li:last-child::after {
    display: none;
  }

  > li {
    &::after,
    > *:first-child::before {
      display: none !important;
    }
  }

  summary {
    cursor: pointer;
    display: inline;
    outline: none;
    user-select: none;
  }

  summary::marker,
  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: '[+]';
    color: var(--text-color-muted);
  }

  details[open] > summary::after {
    content: '[-]';
  }

  summary:hover {
    background: var(--background-muted);
    border-radius: 2px;
  }
}
`
