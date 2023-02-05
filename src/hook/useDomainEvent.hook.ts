import { useEffect } from 'react'

import { useAuth } from './useAuth.hook'

interface Props {
  handler: () => void
}

export const useDomainEvent = ({ handler }: Props) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    handler()
  }, [isAuthenticated])
}
