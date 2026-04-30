import { useEffect, useState } from 'react'

export function useHashPage() {
  const getPageFromHash = () => window.location.hash.replace('#', '') || 'home'
  const [page, setPage] = useState(getPageFromHash)

  useEffect(() => {
    const syncPage = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', syncPage)

    if (!window.location.hash) {
      window.location.hash = 'home'
    }

    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  return [page, setPage]
}
