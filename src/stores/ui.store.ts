import { LOCAL_STORAGE_THEME_KEY } from '@/constants'
import type { InputEditorType, Theme } from '@/types'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const theme = useStorage<Theme>(LOCAL_STORAGE_THEME_KEY, 'light')

  const inputMode = ref<InputEditorType>('text')

  const textEditorValue = ref<string>('')

  const updateTheme = (newTheme: Theme) => {
    theme.value = newTheme
    useStorage(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return { theme, updateTheme, inputMode, textEditorValue }
})
