import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface TopbarProps {
  title?: string
  subtitle?: string
  actions?: ReactNode
  left?: ReactNode
  className?: string
}

export function Topbar({
  title,
  subtitle,
  actions,
  left,
  className,
}: TopbarProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-slate-200 bg-white px-3 py-3 sm:px-6 sm:py-4',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 pr-2">
        {left}
        <div className="min-w-0">
        {title && (
          <h1 className="text-xl font-semibold leading-tight text-[#222222] sm:text-2xl">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-1 text-[14px] leading-snug text-[#666666] sm:text-sm">
            {subtitle}
          </p>
        )}
        </div>
      </div>
      {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
    </header>
  )
}

