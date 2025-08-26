import { LOCAL_STORAGE_THEME_KEY } from '@/constants'
import type { Theme } from '@/types'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const theme = useStorage<Theme>(LOCAL_STORAGE_THEME_KEY, 'light')

  const updateTheme = (newTheme: Theme) => {
    theme.value = newTheme
    useStorage(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return { theme, updateTheme }
})
