import { useUIStore } from '@/stores/ui.store'
import { watchEffect } from 'vue'

export function useHighlightTheme() {
  const uiStore = useUIStore()

  const loadTheme = async (theme: 'light' | 'dark') => {
    // Remove existing highlight.js theme
    const existingLink = document.querySelector('link[data-highlight-theme]')
    if (existingLink) {
      existingLink.remove()
    }

    // Dynamically import and inject the theme CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.setAttribute('data-highlight-theme', 'true')
    
    if (theme === 'dark') {
      const { default: darkTheme } = await import('highlight.js/styles/base16/grayscale-dark.css?url')
      link.href = darkTheme
    } else {
      const { default: lightTheme } = await import('highlight.js/styles/base16/grayscale-light.css?url')
      link.href = lightTheme
    }
    
    document.head.appendChild(link)
  }

  // Watch for theme changes and update highlight.js theme accordingly
  watchEffect(() => {
    loadTheme(uiStore.theme)
  })

  return {
    loadTheme
  }
}