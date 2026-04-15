import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'success' | 'warning' | 'info' | 'neutral' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
  color?: string
}

const variants: Record<Variant, string> = {
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-sky-100 text-sky-700',
  neutral: 'bg-slate-100 text-slate-700',
  danger: 'bg-red-100 text-red-700',
}

export function Badge({ className, variant = 'neutral', color, style, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variants[variant],
        className,
      )}
      style={{ ...style, ...(color ? { color } : {}) }}
      {...props}
    />
  )
}

