const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'tr') => {
  const fn = dictionaries[locale]
  if (!fn) return dictionaries.en()
  return fn()
}
