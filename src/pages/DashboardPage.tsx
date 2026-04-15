import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/ui/button'

type Range = 'day' | 'week' | 'month'
type ChartType = 'line' | 'bar'

export function DashboardPage() {
  const [range, setRange] = useState<Range>('week')
  const [chartType, setChartType] = useState<ChartType>('line')
  const [isMobile, setIsMobile] = useState(false)
  const [limitHit, setLimitHit] = useState(false)
  const [selectedMetrics, setSelectedMetrics] = useState<
    Array<
      | 'registeredUsers'
      | 'activeSubscriptions'
      | 'totalDevices'
      | 'activeDevices'
      | 'guardians'
      | 'childProfiles'
      | 'modeTriggers'
      | 'nudgesGenerated'
    >
  >(['registeredUsers'])

  useEffect(() => {
    if (!limitHit) return
    const t = setTimeout(() => setLimitHit(false), 1400)
    return () => clearTimeout(t)
  }, [limitHit])

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 640)
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const data = useMemo(
    () => [
      {
        name: 'Week 1',
        registeredUsers: 20,
        activeSubscriptions: 10,
        totalDevices: 12,
        activeDevices: 9,
        guardians: 18,
        childProfiles: 12,
        modeTriggers: 14,
        nudgesGenerated: 7,
      },
      {
        name: 'Week 2',
        registeredUsers: 55,
        activeSubscriptions: 22,
        totalDevices: 25,
        activeDevices: 18,
        guardians: 40,
        childProfiles: 24,
        modeTriggers: 20,
        nudgesGenerated: 10,
      },
      {
        name: 'Week 3',
        registeredUsers: 70,
        activeSubscriptions: 30,
        totalDevices: 35,
        activeDevices: 28,
        guardians: 52,
        childProfiles: 30,
        modeTriggers: 25,
        nudgesGenerated: 12,
      },
      {
        name: 'Week 4',
        registeredUsers: 90,
        activeSubscriptions: 38,
        totalDevices: 50,
        activeDevices: 40,
        guardians: 66,
        childProfiles: 38,
        modeTriggers: 32,
        nudgesGenerated: 15,
      },
      {
        name: 'Week 5',
        registeredUsers: 85,
        activeSubscriptions: 36,
        totalDevices: 46,
        activeDevices: 38,
        guardians: 62,
        childProfiles: 36,
        modeTriggers: 30,
        nudgesGenerated: 14,
      },
      {
        name: 'Week 6',
        registeredUsers: 78,
        activeSubscriptions: 34,
        totalDevices: 44,
        activeDevices: 36,
        guardians: 58,
        childProfiles: 34,
        modeTriggers: 28,
        nudgesGenerated: 13,
      },
      {
        name: 'Week 7',
        registeredUsers: 60,
        activeSubscriptions: 28,
        totalDevices: 38,
        activeDevices: 30,
        guardians: 48,
        childProfiles: 28,
        modeTriggers: 22,
        nudgesGenerated: 11,
      },
      {
        name: 'Week 8',
        registeredUsers: 45,
        activeSubscriptions: 24,
        totalDevices: 35,
        activeDevices: 27,
        guardians: 40,
        childProfiles: 25,
        modeTriggers: 18,
        nudgesGenerated: 10,
      },
      {
        name: 'Week 9',
        registeredUsers: 62,
        activeSubscriptions: 31,
        totalDevices: 42,
        activeDevices: 34,
        guardians: 50,
        childProfiles: 32,
        modeTriggers: 24,
        nudgesGenerated: 12,
      },
      {
        name: 'Week 10',
        registeredUsers: 75,
        activeSubscriptions: 35,
        totalDevices: 48,
        activeDevices: 40,
        guardians: 60,
        childProfiles: 38,
        modeTriggers: 28,
        nudgesGenerated: 14,
      },
    ],
    [],
  )

  const chartData = useMemo(() => {
    const labelsByRange: Record<Range, string[]> = {
      day: ['06 AM', '08 AM', '10 AM', '12 PM', '02 PM', '04 PM', '06 PM', '08 PM', '10 PM', '12 AM'],
      week: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    }

    const labels = labelsByRange[range]
    return data.map((item, index) => ({
      ...item,
      name: labels[index] ?? item.name,
    }))
  }, [data, range])

  const cards = [
    {
      key: 'registeredUsers',
      label: 'Total Registered Users',
      value: 248,
      delta: '+12%',
    },
    {
      key: 'activeSubscriptions',
      label: 'Active Subscriptions',
      value: 156,
      delta: '+10%',
    },
    { key: 'totalDevices', label: 'Total Devices', value: 987, delta: '+12%' },
    { key: 'activeDevices', label: 'Active Devices', value: 980, delta: '+08%' },
    { key: 'guardians', label: 'Guardian Profiles', value: 248, delta: '+12%' },
    { key: 'childProfiles', label: 'Child Profiles', value: 156, delta: '+10%' },
    { key: 'modeTriggers', label: 'Aiki ModeTriggers', value: 987, delta: '+12%' },
    { key: 'nudgesGenerated', label: 'Nudges Generated', value: 980, delta: '-06%' },
  ] as const

  const metricMeta: Record<
    (typeof cards)[number]['key'],
    { stroke: string; fill: string; tint: string; border: string; icon: ReactNode }
  > = {
    registeredUsers: {
      stroke: '#0071BC',
      fill: '#0071BC',
      tint: 'bg-[#E7F5FE]',
      border: 'border-[#0071BC]',
      icon: <img src="/Images/icons/trs.png" alt="User" className="h-[50px] w-[50px]" />,
    },
    activeSubscriptions: {
      stroke: '#16A34A',
      fill: '#16A34A',
      tint: 'bg-[#EAF7EE]',
      border: 'border-[#009999]',
      icon: <img src="/Images/icons/as.png" alt="User" className="h-[50px] w-[50px]" />,
    },
    totalDevices: {
      stroke: '#7C3AED',
      fill: '#7C3AED',
      tint: 'bg-[#FAF5FF]',
      border: 'border-[#A24DEE]',
      icon: <img src="/Images/icons/td.png" alt="User" className="h-[50px] w-[50px]" />,
    },
    activeDevices: {
      stroke: '#111827',
      fill: '#111827',
      tint: 'bg-[#FBEFFF]',
      border: 'border-[#8C36AB]',
      icon: <img src="/Images/icons/ad.png" alt="User" className="h-[50px] w-[50px]" />,
    },
    guardians: {
      stroke: '#EC4899',
      fill: '#EC4899',
      tint: 'bg-pink-50',
      border: 'border-[#DB2777]',
      icon: <img src="/Images/icons/gp.png" alt="User" className="h-[50px] w-[50px]" />,
    },
    childProfiles: {
      stroke: '#F97316',
      fill: '#F97316',
      tint: 'bg-orange-50',
      border: 'border-[#EA580C]',
      icon: <img src="/Images/icons/cp.png" alt="User" className="h-[50px] w-[50px]" />,
    },
    modeTriggers: {
      stroke: '#06B6D4',
      fill: '#06B6D4',
      tint: 'bg-cyan-50',
      border: 'border-[#087CAA]',
      icon: <img src="/Images/icons/amt.png" alt="User" className="h-[50px] w-[50px]" />,
    },
    nudgesGenerated: {
      stroke: '#EAB308',
      fill: '#EAB308',
      tint: 'bg-amber-50',
      border: 'border-[#D97706]',
      icon: <img src="/Images/icons/ng.png" alt="User" className="h-[50px] w-[50px]" />,
    },
  }

  const labelByKey = useMemo(() => {
    const map = new Map<(typeof cards)[number]['key'], string>()
    for (const c of cards) map.set(c.key, c.label)
    return map
  }, [cards])

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          (() => {
            const selected = selectedMetrics.includes(c.key)
            const meta = metricMeta[c.key]
            return (
          <div
            key={c.label}
            className={[
              'rounded-2xl p-3 shadow-sm sm:p-4',
              selected
                ? `border-2 ${meta.border} ${meta.tint}`
                : 'border border-slate-200 bg-white',
            ].join(' ')}
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelectedMetrics((prev) => {
                const exists = prev.includes(c.key)
                if (exists) return prev.filter((k) => k !== c.key)
                if (prev.length >= 4) {
                  setLimitHit(true)
                  return prev
                }
                return [...prev, c.key]
              })
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-base text-[#444444] font-medium">{c.label}</p>
              <div
                
              >
                <span
                  className={[
                    'text-slate-600',
                    selected ? 'text-slate-800' : 'text-slate-500',
                  ].join(' ')}
                >
                  {meta.icon}
                </span>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-slate-900">{c.value}</p>
              <p
                className={
                  c.delta.startsWith('-')
                    ? 'mt-1 text-[14px] font-medium text-red-600'
                    : 'mt-1 text-[14px] font-medium text-emerald-600'
                }
              >
                {c.delta}
              </p>
            </div>
          </div>
            )
          })()
        ))}
      </div>

      <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600">
        <div className="h-px flex-1 border-t border-dashed border-slate-300" />
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <span className="text-lg leading-none text-[#444444]">ⓘ</span>
          <span className={limitHit ? 'text-[14px] font-semibold text-red-600' : "font-medium text-[#444444] text-[14px]"}>
            You can select up to 4 metrics to view the chart
          </span>
        </div>
        <div className="h-px flex-1 border-t border-dashed border-slate-300" />
      </div>

      <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-7">
            <h2 className="text-xl font-semibold text-[#222222]">
              Insights Overview
            </h2>

            <div className="hidden sm:inline-flex rounded-xl bg-slate-50 p-1 ring-1 ring-slate-200">
              {(['day', 'week', 'month'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={
                    range === r
                      ? 'rounded-lg bg-[#0071BC] px-3 py-1.5 text-[14px] font-semibold text-[#FAFAFA] shadow-sm'
                      : 'rounded-lg px-3 py-1.5 text-xs font-semibold text-[#444444] hover:text-slate-900'
                  }
                >
                  {r[0].toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="inline-flex rounded-xl bg-slate-50 p-1 ring-1 ring-slate-200">
              <Button
                variant="ghost"
                size="sm"
                className={chartType === 'line' ? 'rounded-xl bg-[#0071BC] shadow-sm' : 'rounded-xl'}
                onClick={() => setChartType('line')}
              >
                {chartType === 'line' ? <img src="/Images/icons/line_selected.png" alt="Line" className="h-[24px] w-[24px]" /> : <img src="/Images/icons/line.png" alt="Line" className="h-[24px] w-[24px]" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={chartType === 'bar' ? 'rounded-xl bg-[#0071BC] shadow-sm' : 'rounded-xl'}
                onClick={() => setChartType('bar')}
              >
                {chartType === 'bar' ? <img src="/Images/icons/bar_selected.png" alt="Bar" className="h-[24px] w-[24px]" /> : <img src="/Images/icons/bar.png" alt="Bar" className="h-[24px] w-[24px]" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 sm:hidden">
            <div className="inline-flex rounded-xl bg-slate-50 p-1 ring-1 ring-slate-200">
              {(['day', 'week', 'month'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={
                    range === r
                      ? 'rounded-lg bg-[#0071BC] px-3 py-1.5 text-[14px] font-semibold text-[#FAFAFA] shadow-sm'
                      : 'rounded-lg px-3 py-1.5 text-xs font-semibold text-[#444444] hover:text-slate-900'
                  }
                >
                  {r[0].toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-xl bg-slate-50 p-1 ring-1 ring-slate-200">
              <Button
                variant="ghost"
                size="sm"
                className={chartType === 'line' ? 'rounded-xl bg-[#0071BC] shadow-sm' : 'rounded-xl'}
                onClick={() => setChartType('line')}
              >
                {chartType === 'line' ? <img src="/Images/icons/line_selected.png" alt="Line" className="h-[24px] w-[24px]" /> : <img src="/Images/icons/line.png" alt="Line" className="h-[24px] w-[24px]" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={chartType === 'bar' ? 'rounded-xl bg-[#0071BC] shadow-sm' : 'rounded-xl'}
                onClick={() => setChartType('bar')}
              >
                {chartType === 'bar' ? <img src="/Images/icons/bar_selected.png" alt="Bar" className="h-[24px] w-[24px]" /> : <img src="/Images/icons/bar.png" alt="Bar" className="h-[24px] w-[24px]" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 h-[260px] w-full rounded-2xl bg-white sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: isMobile ? 11 : 12 }}
                  interval={isMobile ? 'preserveStartEnd' : 0}
                  minTickGap={isMobile ? 24 : 0}
                />
                <YAxis tick={{ fontSize: isMobile ? 11 : 12 }} />
                <Tooltip />
                {selectedMetrics.map((key) => {
                  const meta = metricMeta[key]
                  return (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      name={key}
                      stroke={meta.stroke}
                      fill={meta.fill}
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  )
                })}
              </AreaChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: isMobile ? 11 : 12 }}
                  interval={isMobile ? 'preserveStartEnd' : 0}
                  minTickGap={isMobile ? 24 : 0}
                />
                <YAxis tick={{ fontSize: isMobile ? 11 : 12 }} />
                <Tooltip />
                {selectedMetrics.map((key) => {
                  const meta = metricMeta[key]
                  return (
                    <Bar
                      key={key}
                      dataKey={key}
                      name={key}
                      fill={meta.fill}
                      radius={[6, 6, 0, 0]}
                    />
                  )
                })}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {selectedMetrics.map((key) => {
            const meta = metricMeta[key]
            const label = labelByKey.get(key) ?? key
            return (
              <div
                key={key}
                className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium"
                style={{ borderColor: meta.stroke, color: meta.stroke }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: meta.stroke }}
                />
                <span>{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

