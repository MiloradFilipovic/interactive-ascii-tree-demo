<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useUIStore } from '@/stores/ui.store'
import { computed } from 'vue'
import InputPane from '@/components/input/InputPane.vue'
import OutputPane from '@/components/output/OutputPane.vue'
import { useHighlightTheme } from '@/composables/useHighlightTheme'
import { Eye } from 'lucide-vue-next'

const uiStore = useUIStore()

const currentTheme = computed(() => uiStore.theme)

// Initialize highlight.js theme switching
useHighlightTheme()
</script>

<template>
  <div :class="$style['app-container']" :data-theme="currentTheme">
    <div :class="$style.toolbar">
      <ThemeToggle />
    </div>
    <div :class="$style.content">
      <header :class="$style.header">
        <h1>Collapsible ASCII Tree generator</h1>
        <p>Build interactive, HTML-only, ASCII trees from your text input.</p>
      </header>
      <div :class="$style.panes">
        <div :class="[$style.pane]"><InputPane /></div>
        <div :class="[$style.pane]"><OutputPane /></div>
      </div>
      <section>
        <h2>How does this work?</h2>
        <p>
          Collapse/expand functionality of ASCII trees is achieved using HTML <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details" target="_blank">details</a>
          and <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary" target="_blank">summary</a> HTML elements. Tree-like indentation is created using unordered lists and css.
          ASCII-art lines are appended to list elements using the <code>::before</code> and <code>::after</code> pseudo-elements, 
          while <a href="https://github.com/MiloradFilipovic/interactive-ascii-tree-generator/blob/a687ffbaed4420f20b1e4e6ab1f65efdb255e8ea/src/components/output/ascii/ASCIIPreview.vue#L55" target="_blank">this little hack</a> 
          is used to render vertical lines correctly (It won't work for very nested trees but should cover most cases).
        </p>
      </section>
      <section>
        <h2>How do I use the tree I generated?</h2>
        <p>Copy generated HTML <b>and</b> CSS from their respective tabs in the <i>Result</i> section and paste it into your project.</p>
      </section>
      <section>
        <h2>Need text-only version?</h2>
        <p>Just click the <i>Copy</i> button in the [<span :class="$style.tab"><Eye :size="12" /> Preview</span>] tab.</p>
      </section>
      <section>
        <h2>No-JavaScript is nice but I want more</h2>
        <p>
          Depending on my free time (and motivation), I am planning to release web component and vue versions.
          With custom props and events, it should be easy to use ASCII tree as a functional component, not just for presentation purposes.
        </p>
      </section>
      <section>
        <p>For bug submissions, feature requests or any other inquiries, visit the <a href="https://github.com/MiloradFilipovic/interactive-ascii-tree-generator/issues" target="_blank">GitHub Issues</a> page.</p>
      </section>
      <footer>
        Created by [<a href="https://github.com/MiloradFilipovic" target="_blank">this guy</a>]
      </footer>
    </div>
  </div>
</template>

<style module lang="scss">
.app-container {
  font-family: "Consolas", "Menlo", "DejaVu Sans Mono", "Lucida Console", monospace;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 1rem;
  height: 100%;
  min-height: 100vh;
  padding: 1rem;

  background-color: var(--background-color);
  color: var(--text-color-base);
}

.toolbar {
  display: flex;
  justify-content: end;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 0 10%;

  @media screen and (max-width: 1300px) {
    padding: 0 1rem;
  }
}

h1, h2 {
  color: var(--text-color-dark);
}

a {
  color: var(--text-color-dark);
}

code {
  background-color: var(--background-muted);
  padding: 2px;
}

.tab {
  background-color: var(--background-muted);
  padding: 0 0.3rem;
  font-family: inherit;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    margin: 0;
  }

  p {
    margin: 0;
    color: var(--text-color-lighter);
  }
}

.panes {
  display: flex;
  width: 100%;
  gap: 1rem;

  .pane {
    border: 1px solid var(--text-color-dark);
    padding: 0.5rem;
    background-color: var(--background-color);
    width: 50%;

    & > div {
      min-height: 400px;
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;

    .pane {
      width: 100%;
      box-sizing: border-box;
    }
  }
}

footer {
  border-top: 1px solid var(--text-color-dark);
  padding: 0.3rem 0.2rem;
  text-align: end;
}
</style>
