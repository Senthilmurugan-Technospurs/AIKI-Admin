import type { ColumnDef, SortState } from '../components/ui/data-table'

export function applySort<T>(
  rows: T[],
  columns: Array<ColumnDef<T>>,
  sort: SortState,
): T[] {
  if (!sort) return rows
  const col = columns.find((c) => c.key === sort.key)
  if (!col?.getValue) return rows

  const dir = sort.direction === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => {
    const av = col.getValue?.(a)
    const bv = col.getValue?.(b)
    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
    return String(av).localeCompare(String(bv)) * dir
  })
}

