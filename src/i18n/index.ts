import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 从localStorage获取语言设置，默认为中文
const savedLanguage = localStorage.getItem('language') || 'zh'

export const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: savedLanguage,
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
})

export function changeLanguage(locale: 'zh' | 'en') {
  i18n.global.locale.value = locale
  localStorage.setItem('language', locale)
}