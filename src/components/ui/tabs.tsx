import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TabItem<T extends string> {
  id: T
  label: string
}

interface TabsProps<T extends string> {
  items: Array<TabItem<T>>
  value: T
  onChange: (value: T) => void
  className?: string
}

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  className,
}: TabsProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <div className="inline-flex w-full min-w-max items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white px-2">
        {items.map((it) => {
          const active = it.id === value
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              className={cn(
                'relative px-4 py-3 font-semibold transition-colors text-base',
                active ? 'text-[#0071BC]' : 'text-[#444444] hover:text-slate-800',
                active &&
                  'after:absolute after:left-3 after:right-3 after:bottom-0 after:h-[2px] after:bg-[#0071BC]',
              )}
            >
              {it.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface TabPanelProps {
  children: ReactNode
  className?: string
}

export function TabPanel({ children, className }: TabPanelProps) {
  return <div className={cn('mt-4', className)}>{children}</div>
}

