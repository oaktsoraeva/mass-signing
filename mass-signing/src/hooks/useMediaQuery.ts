import { useEffect, useState } from 'react'

/**
 * Подписка на медиа-запрос. Нужна там, где раскладку нельзя переключить одним CSS:
 * таблица и список карточек — разные структуры DOM, а не разные стили одной.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handleChange = () => setMatches(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    // Подстраховка: при программной смене вьюпорта change у MediaQueryList иногда не приходит
    window.addEventListener('resize', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleChange)
    }
  }, [query])

  return matches
}
