import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

export interface SidebarItem {
  id: string
  label: string
  icon?: ReactNode
  to: string
}

interface SidebarProps {
  items: SidebarItem[]
  header?: ReactNode
  footer?: ReactNode
  onSelect?: (id: string) => void
  collapsed?: boolean
  className?: string
}

export function Sidebar({
  items,
  header,
  footer,
  onSelect,
  collapsed,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-slate-800 bg-[#0F172A]',
        collapsed ? 'w-[60px]' : 'w-64',
        className,
      )}
    >
      {header && (
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-4 text-lg font-semibold text-white',
            collapsed && 'justify-center px-0 py-3',
          )}
        >
          {header}
        </div>
      )}

      <nav
        className={cn(
          'flex-1 space-y-2 py-2 text-sm text-slate-200',
          collapsed && 'px-0',
        )}
      >
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            onClick={() => onSelect?.(item.id)}
            className={({ isActive }) =>
              cn(
                'group relative flex w-full items-center overflow-hidden text-left transition-colors',
                collapsed
                  ? cn(
                      'justify-center py-2',
                      isActive
                        ? 'active text-white'
                        : '',
                    )
                  : cn(
                      'gap-3 rounded-none px-3 py-3 sm:rounded-xl',
                      isActive
                        ? 'active bg-[#0E2B45] text-white shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-white'
                        : 'text-slate-300 hover:bg-slate-900/60 hover:text-white',
                    ),
              )
            }
            title={collapsed ? item.label : undefined}
          >
            {item.icon && (
              <span
                className={cn(
                  collapsed
                    ? cn(
                        'relative grid h-[50px] w-[60px] place-items-center overflow-hidden rounded-lg transition-colors',
                        'bg-slate-900/30 text-slate-200 group-hover:bg-slate-900/50',
                        'group-[.active]:bg-[#0E2B45] group-[.active]:text-white group-[.active]:shadow-sm',
                        'group-[.active]:before:absolute group-[.active]:before:left-0 group-[.active]:before:top-0 group-[.active]:before:bottom-0 group-[.active]:before:w-[3px] group-[.active]:before:bg-white',
                      )
                    : cn('text-slate-300 group-hover:text-white', 'group-[.active]:text-white'),
                )}
              >
                {item.icon}
              </span>
            )}
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {footer && (
        <div className="border-t border-white px-4 py-3">{footer}</div>
      )}
    </aside>
  )
}

