import { Search } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { DataTable, type ColumnDef, type SortState } from '../components/ui/data-table'
import { cn } from '../lib/cn'
import { applySort } from '../lib/table'

type Row = {
  id: string
  guardianName: string
  email: string
  plan: 'Pro' | 'Basic' | 'NA'
  device: string
  deviceId: string
  subscription: 'Subscribed' | 'Paused' | 'Unsubscribed'
  startDate: string
}

function toCsv(rows: Row[], cols: Array<ColumnDef<Row>>) {
  const visible = cols.filter((c) => !c.hidden)
  const headers = visible.map((c) => String(c.header))
  const lines = rows.map((r) =>
    visible
      .map((c) => {
        const v = c.getValue?.(r)
        const s = v == null ? '' : String(v)
        return `"${s.replaceAll('"', '""')}"`
      })
      .join(','),
  )
  return [headers.join(','), ...lines].join('\n')
}

export function SubscriptionManagementPage() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortState>({ key: 'guardianName', direction: 'desc' })
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const rows: Row[] = useMemo(
    () => [
      {
        id: '1',
        guardianName: 'Steve Smith',
        email: 'stevesmith098@gmail.com',
        plan: 'Pro',
        device: 'Aiki Watch Pro 2',
        deviceId: 'AIKI-4821-XD',
        subscription: 'Subscribed',
        startDate: '12 Feb 2026',
      },
      {
        id: '2',
        guardianName: 'Maria Steve',
        email: 'maria12steve@gmail.com',
        plan: 'Pro',
        device: 'Aiki Watch Pro',
        deviceId: 'AIKI-7392-LQ',
        subscription: 'Subscribed',
        startDate: '05 Feb 2026',
      },
      {
        id: '3',
        guardianName: 'Michael Chen',
        email: 'm.chen@gmail.com',
        plan: 'Basic',
        device: 'Aiki Watch Pro',
        deviceId: 'AIKI-9182-ZM',
        subscription: 'Paused',
        startDate: '---',
      },
      {
        id: '4',
        guardianName: 'Helen Smith',
        email: 'helensmite@gmail.com',
        plan: 'Pro',
        device: 'Aiki Watch Lite',
        deviceId: 'AIKI-5647-RT',
        subscription: 'Subscribed',
        startDate: '21 Jan 2026',
      },
      {
        id: '5',
        guardianName: 'Emily Rodriguez',
        email: 'emily.rodriguez@gmail.com',
        plan: 'NA',
        device: 'Aiki Watch Max',
        deviceId: 'AIKI-1029-PK',
        subscription: 'Unsubscribed',
        startDate: '---',
      },
      {
        id: '6',
        guardianName: 'Ethan Walker',
        email: 'stevesmith098@gmail.com',
        plan: 'Pro',
        device: 'Aiki Watch Pro 2',
        deviceId: 'AIKI-4821-XD',
        subscription: 'Subscribed',
        startDate: '18 Feb 2026',
      },
      {
        id: '7',
        guardianName: 'Olivia Bennett',
        email: 'stevesmith098@gmail.com',
        plan: 'Basic',
        device: 'Aiki Watch Pro 2',
        deviceId: 'AIKI-4821-XD',
        subscription: 'Paused',
        startDate: '---',
      },
      {
        id: '8',
        guardianName: 'Liam Carter',
        email: 'stevesmith098@gmail.com',
        plan: 'NA',
        device: 'Aiki Watch Pro 2',
        deviceId: 'AIKI-4821-XD',
        subscription: 'Unsubscribed',
        startDate: '---',
      },
      {
        id: '9',
        guardianName: 'Sophia Martinez',
        email: 'stevesmith098@gmail.com',
        plan: 'NA',
        device: 'Aiki Watch Pro 2',
        deviceId: 'AIKI-4821-XD',
        subscription: 'Unsubscribed',
        startDate: '---',
      },
      {
        id: '10',
        guardianName: 'Noah Anderson',
        email: 'stevesmith098@gmail.com',
        plan: 'Basic',
        device: 'Aiki Watch Pro 2',
        deviceId: 'AIKI-4821-XD',
        subscription: 'Subscribed',
        startDate: '02 Jan 2025',
      },
    ],
    [],
  )

  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({
    guardianName: true,
    email: true,
    plan: true,
    device: true,
    deviceId: true,
    subscription: true,
    startDate: true,
    actions: true,
  })

  const columns: Array<ColumnDef<Row>> = useMemo(
    () => [
      {
        key: 'guardianName',
        header: 'Guardian Name',
        sortable: true,
        hidden: !visibleKeys.guardianName,
        getValue: (r) => r.guardianName,
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <span className="font-medium text-[#222222] text-[14px]">{r.guardianName}</span>
          </div>
        ),
      },
      {
        key: 'email',
        header: 'Email ID',
        sortable: true,
        hidden: !visibleKeys.email,
        getValue: (r) => r.email,
      },
      {
        key: 'plan',
        header: 'Plan',
        sortable: true,
        hidden: !visibleKeys.plan,
        getValue: (r) => r.plan,
        cell: (r) => (
          <Badge
            variant="neutral"
            style={{
              backgroundColor: r.plan === 'Pro' ? '#009999' : r.plan === 'Basic' ? '#0071BC' : '#888888',
              color: '#FFFFFF',
            }}
          >
            {r.plan}
          </Badge>
        ),
      },
      { key: 'device', header: 'Device', sortable: true, hidden: !visibleKeys.device, getValue: (r) => r.device },
      { key: 'deviceId', header: 'Device ID', sortable: true, hidden: !visibleKeys.deviceId, getValue: (r) => r.deviceId },
      {
        key: 'subscription',
        header: 'Subscription',
        sortable: true,
        hidden: !visibleKeys.subscription,
        getValue: (r) => r.subscription,
        cell: (r) => (
          <Badge
            variant={
              r.subscription === 'Subscribed'
                ? 'success'
                : r.subscription === 'Paused'
                  ? 'warning'
                  : 'neutral'
            }
          >
            {r.subscription}
          </Badge>
        ),
      },
      { key: 'startDate', header: 'Start Date', sortable: true, hidden: !visibleKeys.startDate, getValue: (r) => r.startDate },
      {
        key: 'actions',
        header: 'Quick Actions',
        hidden: !visibleKeys.actions,
        cell: () => (
          <div className="flex items-center gap-2 text-slate-500">
            <button className="rounded-md p-2 hover:bg-slate-100" aria-label="View">
              <img src="/Images/icons/view.png" alt="View" className="h-6 w-6" />
            </button>
            <button className="rounded-md p-2 hover:bg-slate-100" aria-label="Edit">
              <img src="/Images/icons/edit.png" alt="Edit" className="h-6 w-6" />
            </button>
            <button className="rounded-md p-2 hover:bg-slate-100" aria-label="More">
              <img src="/Images/icons/more.png" alt="More" className="h-6 w-6" />
            </button>
          </div>
        ),
      },
    ],
    [visibleKeys],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      [r.guardianName, r.email, r.plan, r.device, r.deviceId, r.subscription, r.startDate]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [query, rows])

  const sortedRows = useMemo(() => applySort(filtered, columns, sort), [filtered, columns, sort])

  const totals = useMemo(() => {
    const total = 248
    const active = 156
    const paused = 67
    const unsub = 25
    return { total, active, paused, unsub }
  }, [])

  const downloadCsv = () => {
    const csv = toCsv(sortedRows, columns)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscriptions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] font-medium text-[#444444]">Total Guardians</p>
              <p className="mt-2 text-3xl font-bold text-[#222222]">{totals.total}</p>
            </div>
            <div className="grid place-items-center">
              <img src="/Images/icons/tg.png" alt="Total Guardians" className="h-[50px] w-[50px]" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] font-medium text-[#444444]">Active Subscriptions</p>
              <p className="mt-2 text-3xl font-bold text-[#29C18E]">{totals.active}</p>
            </div>
            <div className="grid place-items-center">
              <img src="/Images/icons/ass.png" alt="Active Subscriptions" className="h-[50px] w-[50px]" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] font-medium text-[#444444]">Paused Subscriptions</p>
              <p className="mt-2 text-3xl font-bold text-[#F59E0B]">{totals.paused}</p>
            </div>
            <div className="grid place-items-center">
              <img src="/Images/icons/ps.png" alt="Paused Subscriptions" className="h-[50px] w-[50px]" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] font-medium text-[#444444]">Unsubscribed</p>
              <p className="mt-2 text-3xl font-bold text-[#888888]">{totals.unsub}</p>
            </div>
            <div className="grid place-items-center">
              <img src="/Images/icons/us.png" alt="Unsubscribed" className="h-[50px] w-[50px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200 sm:p-4">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="flex flex-col gap-3 border-b border-[#2B6AB0] bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-[#444444]">Subscription List</h2>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[360px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E2B45]/20"
                  placeholder="Search by name, email or phone number"
                />
              </div>

              <div className="hidden h-6 w-px mx-3 bg-slate-300 sm:block" aria-hidden="true" />

              <div className="relative" ref={menuRef}>
                <Button
                  variant="secondary"
                  className="h-10 rounded-xl"
                  leftIcon={<img src="/Images/icons/customise.png" alt="Settings" className="h-6 w-6" />}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  Customize View
                </Button>

                {menuOpen && (
                  <div
                    className="absolute right-0 top-12 z-10 w-64 overflow-hidden rounded-xl border border-slate-300 bg-[#FFFFFF] shadow-lg"
                    role="dialog"
                  >
                    <div>
                      {[
                        ['guardianName', 'Guardian Name'],
                        ['email', 'Email ID'],
                        ['plan', 'Plan'],
                        ['device', 'Device'],
                        ['deviceId', 'Device ID'],
                        ['subscription', 'Subscription'],
                        ['startDate', 'Start Date'],
                        ['endDate', 'End Date'],
                      ].map(([k, label]) => (
                        <label
                          key={k}
                          className="flex cursor-pointer items-center gap-3 border-b border-slate-300 px-6 py-4 last:border-b-0"
                        >
                          <input
                            type="checkbox"
                            checked={k === 'endDate' ? false : !!visibleKeys[k]}
                            disabled={k === 'endDate'}
                            className="h-5 w-5 rounded accent-[#009999] disabled:cursor-not-allowed disabled:accent-slate-400"
                            onChange={(e) =>
                              setVisibleKeys((prev) => ({ ...prev, [k]: e.target.checked }))
                            }
                          />
                          <span className="text-[15px] leading-none text-[#222222]">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden h-6 w-px mx-3 bg-slate-300 sm:block" aria-hidden="true" />

              <Button className="h-10 rounded-xl bg-[#009999] text-white" leftIcon={<img src="/Images/icons/download.png" alt="Download" className="h-6 w-6" />} onClick={downloadCsv}>
                Download
              </Button>
            </div>
          </div>

          <DataTable
            columns={columns}
            rows={sortedRows}
            sort={sort}
            onSortChange={setSort}
            getRowKey={(r) => r.id}
            minWidthClassName={cn('min-w-[1200px]', !visibleKeys.email && 'min-w-[1000px]')}
          />

          <div className="flex flex-col gap-3 px-3 py-2.5 text-[#222222] text-[14px] sm:flex-row sm:items-center sm:justify-between">
            <span className="whitespace-nowrap">Showing: 1 of 10 of 248 guardians</span>
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
              <button className="rounded-md border border-slate-200 px-3 py-2 text-slate-400" disabled>
                Previous
              </button>
              <button className="rounded-md bg-[#2B6AB0] px-4 py-2 text-white">1</button>
              <button className="rounded-md border border-slate-200 px-3 py-2 text-slate-700">2</button>
              <button className="rounded-md border border-slate-200 px-3 py-2 text-slate-700">3</button>
              <button className="rounded-md border border-slate-200 px-3 py-2 text-slate-400" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

