'use client'

import React from 'react'
import translations from '@/public/static/locales/translations.json'

type Trans = {
  [key: string]: {
    [index: string]: { [key: string]: string }
  }
}

const useTranslations = (currentLanguage: string) => {
  currentLanguage = currentLanguage || 'en'

  const translate = (str: string): string => {
    let namespace = "common"
    let key = str
    if (typeof str == "string" && str.includes(":")) {
      const splitted = str.split(":")
      namespace = splitted[0]
      key = splitted[1]
    }
    const trans = translations as Trans
    if (trans[namespace][currentLanguage][key])
      return trans[namespace][currentLanguage][key]

    return key
  }
  return { t: translate }
}
export default useTranslations
