import { useParams } from 'next/navigation'
import { Locale, defaultLocale } from './config'
import { messages } from './messages'

export function useLocale() {
  const params = useParams()
  const locale = (params.locale as Locale) || defaultLocale

  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = messages[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  // دالة للحصول على القيم المتداخلة مثل المصفوفات
  const tArray = (key: string) => {
    const value = t(key)
    return Array.isArray(value) ? value : []
  }

  // دالة للحصول على كائن
  const tObject = (key: string) => {
    const value = t(key)
    return typeof value === 'object' && !Array.isArray(value) ? value : {}
  }

  return {
    locale,
    t,
    tArray,
    tObject
  }
}
