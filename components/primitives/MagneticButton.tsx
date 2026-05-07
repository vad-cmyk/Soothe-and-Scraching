import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className }: Props) {
  return <div className={className}>{children}</div>
}
