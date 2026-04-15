import { ChevronDown, ChevronUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type SortDirection = 'asc' | 'desc'
export type SortState = { key: string; direction: SortDirection } | null

export interface ColumnDef<T> {
  key: string
  header: ReactNode
  sortable?: boolean
  hidden?: boolean
  className?: string
  headerClassName?: string
  getValue?: (row: T) => string | number | null | undefined
  cell?: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Array<ColumnDef<T>>
  rows: T[]
  sort: SortState
  onSortChange?: (next: SortState) => void
  getRowKey: (row: T, index: number) => string
  empty?: ReactNode
  minWidthClassName?: string
}

function nextSort(current: SortState, key: string): SortState {
  if (!current || current.key !== key) return { key, direction: 'desc' }
  return { key, direction: current.direction === 'desc' ? 'asc' : 'desc' }
}

export function DataTable<T>({
  columns,
  rows,
  sort,
  onSortChange,
  getRowKey,
  empty = <div className="p-6 text-center text-sm text-slate-500">No results</div>,
  minWidthClassName = 'min-w-[900px]',
}: DataTableProps<T>) {
  const visibleCols = columns.filter((c) => !c.hidden)

  return (
    <div className="overflow-x-auto bg-white">
      <table className={cn('w-full text-left text-sm', minWidthClassName)}>
        <thead className="border-b border-[#E5E7EB] bg-slate-50 text-[14px] font-semibold text-[#2B6AB0]">
          <tr>
            {visibleCols.map((col) => {
              const isActive = sort?.key === col.key
              return (
                <th
                  key={col.key}
                  className={cn('whitespace-nowrap px-3 py-2.5 md:h-10 md:py-0', col.headerClassName)}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 whitespace-nowrap hover:text-slate-900"
                      onClick={() => onSortChange?.(nextSort(sort, col.key))}
                    >
                      <span>{col.header}</span>
                      {isActive ? (
                        sort?.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4 text-slate-800" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-800" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-300" />
                      )}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      <span>{col.header}</span>
                      <ChevronDown className="h-4 w-4 text-slate-200" />
                    </span>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>

        {rows.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={visibleCols.length}>{empty}</td>
            </tr>
          </tbody>
        ) : (
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className="text-slate-700">
                {visibleCols.map((col) => (
                  <td key={col.key} className={cn('px-3 py-2.5 text-[#222222] text-[14px]', col.className)}>
                    {col.cell ? col.cell(row) : String(col.getValue?.(row) ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  )
}

