import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default),
  de: () => import('../dictionaries/de.json').then((module) => module.default),
  it: () => import('../dictionaries/it.json').then((module) => module.default),
  pt: () => import('../dictionaries/pt.json').then((module) => module.default),
  ja: () => import('../dictionaries/ja.json').then((module) => module.default),
  ko: () => import('../dictionaries/ko.json').then((module) => module.default),
  zh: () => import('../dictionaries/zh.json').then((module) => module.default),
  ar: () => import('../dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const dictionary = dictionaries[locale as keyof typeof dictionaries];
  if (!dictionary) {
    return dictionaries.en();
  }
  return dictionary();
}; 