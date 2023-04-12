import React from 'react'


const useTranslations = (currentLanguage) => {
 // console.log("props lang",lang)
    
    const namespaces = {
      homepage: require(`../public/static/locales/${currentLanguage}/homepage`),
      products: require(`../public/static/locales/${currentLanguage}/products.json`),
      auth: require(`../public/static/locales/${currentLanguage}/auth.json`),
      reviews: require(`../public/static/locales/${currentLanguage}/reviews`),
      aboutus: require(`../public/static/locales/${currentLanguage}/aboutus`)
    }
  
    const translate = (str) => {
      let namespace = "common"
      let key = str
      if (typeof str == "string" && str.includes(":")) {
        const splitted = str.split(":")
        namespace = splitted[0]
        key = splitted[1]
      }
      if (namespaces[namespace] && namespaces[namespace][key])
        return namespaces[namespace][key]
      return key
    }
  
    return { t: translate }
  }
  export default useTranslations
