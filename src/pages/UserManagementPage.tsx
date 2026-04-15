import {
  CreditCard,
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  User,
  Users,
  Watch,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { DataTable, type ColumnDef, type SortState } from '../components/ui/data-table'
import { Tabs } from '../components/ui/tabs'
import { applySort } from '../lib/table'
import { Modal } from '../components/ui/modal'

type ChildRow = {
  id: string
  childName: string
  age: number
  gender: 'Girl' | 'Boy'
  guardianName: string
  deviceName: string
  deviceId: string
  deviceStatus: 'Connected' | 'Not Connected' | 'No Device'
}

type GuardianRow = {
  id: string
  guardianName: string
  email: string
  phone: string
  subscription: 'Subscribed' | 'Paused' | 'Unsubscribed'
  lastActiveLabel: 'Active' | 'Recent' | 'Idle' | 'Inactive'
  lastActiveTime: string
}

type AdminRow = {
  id: string
  name: string
  email: string
  status: 'Active' | 'Inactive'
  role: 'Super Admin' | 'Admin' | 'Device Linked' | 'Support'
  lastActive: string
}

type ActiveTable =
  | {
      tab: 'child'
      title: string
      placeholder: string
      rows: ChildRow[]
      columns: Array<ColumnDef<ChildRow>>
    }
  | {
      tab: 'guardian'
      title: string
      placeholder: string
      rows: GuardianRow[]
      columns: Array<ColumnDef<GuardianRow>>
    }
  | {
      tab: 'admin'
      title: string
      placeholder: string
      rows: AdminRow[]
      columns: Array<ColumnDef<AdminRow>>
    }

export function UserManagementPage() {
  const [tab, setTab] = useState<'child' | 'guardian' | 'admin'>('child')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortState>({ key: 'childName', direction: 'desc' })
  const [viewChildOpen, setViewChildOpen] = useState(false)
  const [viewGuardianOpen, setViewGuardianOpen] = useState(false)
  const [editChildOpen, setEditChildOpen] = useState(false)
  const [editGuardianOpen, setEditGuardianOpen] = useState(false)
  const [createAdminOpen, setCreateAdminOpen] = useState(false)
  const [viewAdminOpen, setViewAdminOpen] = useState(false)
  const [editAdminOpen, setEditAdminOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState<ChildRow | null>(null)
  const [selectedGuardian, setSelectedGuardian] = useState<GuardianRow | null>(null)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminRow | null>(null)

  const childRows: ChildRow[] = useMemo(
    () => [
      {
        id: '1',
        childName: 'Jane',
        age: 3,
        gender: 'Girl',
        guardianName: 'Steve Smith',
        deviceName: 'Aiki Watch Pro 2',
        deviceId: 'AIKI-4821-XD',
        deviceStatus: 'Connected',
      },
      {
        id: '2',
        childName: 'Anvi',
        age: 12,
        gender: 'Girl',
        guardianName: 'Helen Smith',
        deviceName: 'Aiki Watch Pro',
        deviceId: 'AIKI-7392-LQ',
        deviceStatus: 'Not Connected',
      },
      {
        id: '3',
        childName: 'Mickey',
        age: 5,
        gender: 'Boy',
        guardianName: 'Maria Steve',
        deviceName: 'Aiki Watch Pro',
        deviceId: 'AIKI-9182-ZM',
        deviceStatus: 'Connected',
      },
      {
        id: '4',
        childName: 'Steve',
        age: 10,
        gender: 'Boy',
        guardianName: 'Emily Rodriguez',
        deviceName: 'Aiki Watch Lite',
        deviceId: 'AIKI-5647-RT',
        deviceStatus: 'Connected',
      },
      {
        id: '5',
        childName: 'Vivian',
        age: 6,
        gender: 'Girl',
        guardianName: 'Michael Chen',
        deviceName: 'Aiki Watch Max',
        deviceId: 'AIKI-1029-PK',
        deviceStatus: 'No Device',
      },
    ],
    [],
  )

  const guardianRows: GuardianRow[] = useMemo(
    () => [
      {
        id: 'g1',
        guardianName: 'Steve Smith',
        email: 'stevesmith098@gmail.com',
        phone: '+91 88833-38889',
        subscription: 'Subscribed',
        lastActiveLabel: 'Active',
        lastActiveTime: '1 hour ago',
      },
      {
        id: 'g2',
        guardianName: 'Maria Steve',
        email: 'maria12steve@gmail.com',
        phone: '+91 88833-38882',
        subscription: 'Subscribed',
        lastActiveLabel: 'Recent',
        lastActiveTime: '2 days ago',
      },
      {
        id: 'g3',
        guardianName: 'Michael Chen',
        email: 'm.chen@gmail.com',
        phone: '+91 34833-45689',
        subscription: 'Paused',
        lastActiveLabel: 'Idle',
        lastActiveTime: '1 week ago',
      },
      {
        id: 'g4',
        guardianName: 'Helen Smith',
        email: 'helensmite@gmail.com',
        phone: '- NA -',
        subscription: 'Subscribed',
        lastActiveLabel: 'Active',
        lastActiveTime: '10 hour ago',
      },
      {
        id: 'g5',
        guardianName: 'Emily Rodriguez',
        email: 'emily.rodriguez@gmail.com',
        phone: '+91 63637 - 37262',
        subscription: 'Unsubscribed',
        lastActiveLabel: 'Inactive',
        lastActiveTime: '1+ month',
      },
    ],
    [],
  )

  const adminRows: AdminRow[] = useMemo(
    () => [
      {
        id: 'a1',
        name: 'John Smith',
        email: 'john.smith@gmail.com',
        status: 'Active',
        role: 'Super Admin',
        lastActive: '2 hrs ago',
      },
      {
        id: 'a2',
        name: 'Emily Johnson',
        email: 'emily134@gmail.com',
        status: 'Active',
        role: 'Admin',
        lastActive: '5 hrs ago',
      },
      {
        id: 'a3',
        name: 'Kingsley Parker',
        email: 'parker.king12@gmail.com',
        status: 'Active',
        role: 'Admin',
        lastActive: '7 hrs ago',
      },
      {
        id: 'a4',
        name: 'David Cartlen',
        email: 'davidrocky@gmail.com',
        status: 'Active',
        role: 'Device Linked',
        lastActive: 'Yesterday',
      },
      {
        id: 'a5',
        name: 'Rodriguez Sam',
        email: 'rodriguez.sam@gmail.com',
        status: 'Inactive',
        role: 'Support',
        lastActive: '3 days ago',
      },
    ],
    [],
  )

  const childColumns: Array<ColumnDef<ChildRow>> = [
      {
        key: 'childName',
        header: 'Child Name',
        sortable: true,
        getValue: (r) => r.childName,
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <span className="font-medium text-[#222222] text-[14px]">{r.childName}</span>
          </div>
        ),
      },
      { key: 'age', header: 'Age', sortable: true, getValue: (r) => r.age, cell: (r) => `${r.age} yrs` },
      { key: 'gender', header: 'Gender', sortable: true, getValue: (r) => r.gender },
      {
        key: 'guardianName',
        header: 'Guardian Name',
        sortable: true,
        getValue: (r) => r.guardianName,
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <span>{r.guardianName}</span>
          </div>
        ),
      },
      { key: 'deviceName', header: 'Device Name', sortable: true, getValue: (r) => r.deviceName },
      { key: 'deviceId', header: 'Device ID', sortable: true, getValue: (r) => r.deviceId },
      {
        key: 'deviceStatus',
        header: 'Device Status',
        sortable: true,
        getValue: (r) => r.deviceStatus,
        cell: (r) => (
          <Badge
            variant={
              r.deviceStatus === 'Connected'
                ? 'success'
                : r.deviceStatus === 'Not Connected'
                  ? 'warning'
                  : 'neutral'
            }
          >
            {r.deviceStatus}
          </Badge>
        ),
      },
      {
        key: 'actions',
        header: 'Quick Actions',
        cell: (r) => (
          <div className="flex items-center gap-2 text-slate-500">
            <button
              className="rounded-md p-2 hover:bg-slate-100"
              aria-label="View"
              onClick={() => {
                setSelectedChild(r)
                setViewChildOpen(true)
              }}
            >
              <img src="/Images/icons/view.png" alt="View" className="h-6 w-6" />
            </button>
            <button
              className="rounded-md p-2 hover:bg-slate-100"
              aria-label="Edit"
              onClick={() => {
                setSelectedChild(r)
                setEditChildOpen(true)
              }}
            >
              <img src="/Images/icons/edit.png" alt="Edit" className="h-6 w-6" />
            </button>
            <button className="rounded-md p-2 hover:bg-slate-100" aria-label="More">
              <img src="/Images/icons/more.png" alt="More" className="h-6 w-6" />
            </button>
          </div>
        ),
      },
    ]

  const guardianColumns: Array<ColumnDef<GuardianRow>> = [
      {
        key: 'guardianName',
        header: 'Guardian Name',
        sortable: true,
        getValue: (r) => r.guardianName,
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <span className="font-medium text-[#222222] text-[14px]">{r.guardianName}</span>
          </div>
        ),
      },
      { key: 'email', header: 'Email ID', sortable: true, getValue: (r) => r.email },
      {
        key: 'phone',
        header: 'Phone Number',
        sortable: true,
        getValue: (r) => r.phone,
      },
      {
        key: 'subscription',
        header: 'Subscription',
        sortable: true,
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
      {
        key: 'lastActive',
        header: 'Last Active',
        sortable: true,
        getValue: (r) => `${r.lastActiveLabel} ${r.lastActiveTime}`,
        cell: (r) => (
          <div className="flex items-center gap-2">
            <span
              className={
                r.lastActiveLabel === 'Active'
                  ? 'h-2.5 w-2.5 rounded-full bg-emerald-500'
                  : r.lastActiveLabel === 'Recent'
                    ? 'h-2.5 w-2.5 rounded-full bg-sky-500'
                    : r.lastActiveLabel === 'Idle'
                      ? 'h-2.5 w-2.5 rounded-full bg-amber-500'
                      : 'h-2.5 w-2.5 rounded-full bg-slate-400'
              }
            />
            <span className="font-medium text-slate-700">{r.lastActiveLabel}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{r.lastActiveTime}</span>
          </div>
        ),
      },
      {
        key: 'actions',
        header: 'Quick Actions',
        cell: (r) => (
          <div className="flex items-center gap-2 text-slate-500">
            <button
              className="rounded-md p-2 hover:bg-slate-100"
              aria-label="View"
              onClick={() => {
                setSelectedGuardian(r)
                setViewGuardianOpen(true)
              }}
            >
              <img src="/Images/icons/view.png" alt="View" className="h-6 w-6" />
            </button>
            <button
              className="rounded-md p-2 hover:bg-slate-100"
              aria-label="Edit"
              onClick={() => {
                setSelectedGuardian(r)
                setEditGuardianOpen(true)
              }}
            >
              <img src="/Images/icons/edit.png" alt="Edit" className="h-6 w-6" />
            </button>
            <button className="rounded-md p-2 hover:bg-slate-100" aria-label="More">
              <img src="/Images/icons/more.png" alt="More" className="h-6 w-6" />
            </button>
          </div>
        ),
      },
    ]

  const adminColumns: Array<ColumnDef<AdminRow>> = [
      {
        key: 'name',
        header: 'Name',
        sortable: true,
        getValue: (r) => r.name,
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <span className="font-medium text-[#222222] text-[14px]">{r.name}</span>
          </div>
        ),
      },
      { key: 'email', header: 'Email ID', sortable: true, getValue: (r) => r.email },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        getValue: (r) => r.status,
        cell: (r) => (
          <Badge variant={r.status === 'Active' ? 'success' : 'neutral'}>
            {r.status}
          </Badge>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        sortable: true,
        getValue: (r) => r.role,
        cell: (r) => (
          <Badge
            variant={
              r.role === 'Super Admin'
                ? 'danger'
                : r.role === 'Admin'
                  ? 'info'
                  : r.role === 'Device Linked'
                    ? 'success'
                    : 'neutral'
            }
          >
            {r.role}
          </Badge>
        ),
      },
      { key: 'lastActive', header: 'Last Active', sortable: true, getValue: (r) => r.lastActive },
      {
        key: 'actions',
        header: 'Quick Actions',
        cell: (r) => (
          <div className="flex items-center gap-2 text-slate-500">
            <button
              className="rounded-md p-2 hover:bg-slate-100"
              aria-label="View"
              onClick={() => {
                setSelectedAdmin(r)
                setViewAdminOpen(true)
              }}
            >
              <img src="/Images/icons/view.png" alt="View" className="h-6 w-6" />
            </button>
            <button
              className="rounded-md p-2 hover:bg-slate-100"
              aria-label="Edit"
              onClick={() => {
                setSelectedAdmin(r)
                setEditAdminOpen(true)
              }}
            >
              <img src="/Images/icons/edit.png" alt="Edit" className="h-6 w-6" />
            </button>
            <button className="rounded-md p-2 hover:bg-slate-100" aria-label="More">
              <img src="/Images/icons/more.png" alt="More" className="h-6 w-6" />            </button>
          </div>
        ),
      },
    ]

  const activeRowsAndCols: ActiveTable = (() => {
    if (tab === 'guardian')
      return {
        tab,
        rows: guardianRows,
        columns: guardianColumns,
        title: 'Guardian List',
        placeholder: 'Search by name, email or phone number',
      }
    if (tab === 'admin')
      return {
        tab,
        rows: adminRows,
        columns: adminColumns,
        title: 'Admin List',
        placeholder: 'Search by name, email',
      }
    return {
      tab: 'child',
      rows: childRows,
      columns: childColumns,
      title: 'Child List',
      placeholder: 'Search by name or guardian name',
    }
  })()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = activeRowsAndCols.rows
    if (!q) return base
    return base.filter((r) => JSON.stringify(r).toLowerCase().includes(q))
  }, [activeRowsAndCols.rows, query])

  const sortedRows = useMemo(() => {
    if (activeRowsAndCols.tab === 'child')
      return applySort(
        filtered as ChildRow[],
        activeRowsAndCols.columns as Array<ColumnDef<ChildRow>>,
        sort,
      )
    if (activeRowsAndCols.tab === 'guardian')
      return applySort(
        filtered as GuardianRow[],
        activeRowsAndCols.columns as Array<ColumnDef<GuardianRow>>,
        sort,
      )
    return applySort(
      filtered as AdminRow[],
      activeRowsAndCols.columns as Array<ColumnDef<AdminRow>>,
      sort,
    )
  }, [activeRowsAndCols, filtered, sort])

  const createAdminSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Enter a valid email'),
    accountStatus: z.boolean(),
    adminType: z.enum(['Internal', 'External']),
    adminRole: z.string().min(1, 'Select a role'),
  })

  type CreateAdminForm = z.infer<typeof createAdminSchema>

  const createAdminForm = useForm<CreateAdminForm>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      fullName: '',
      email: '',
      accountStatus: true,
      adminType: 'Internal',
      adminRole: 'Random Admin B',
    },
  })

  const adminType = useWatch({ control: createAdminForm.control, name: 'adminType' })
  const accountStatus = useWatch({
    control: createAdminForm.control,
    name: 'accountStatus',
  })
  const adminRole = useWatch({ control: createAdminForm.control, name: 'adminRole' })

  const editAdminSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Enter a valid email'),
    accountStatus: z.boolean(),
    adminType: z.enum(['Internal', 'External']),
    adminRole: z.string().min(1, 'Select a role'),
  })

  type EditAdminForm = z.infer<typeof editAdminSchema>

  const editAdminForm = useForm<EditAdminForm>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      fullName: '',
      email: '',
      accountStatus: true,
      adminType: 'Internal',
      adminRole: 'Random Admin B',
    },
  })

  const editAdminType = useWatch({ control: editAdminForm.control, name: 'adminType' })
  const editAccountStatus = useWatch({
    control: editAdminForm.control,
    name: 'accountStatus',
  })
  const editAdminRole = useWatch({ control: editAdminForm.control, name: 'adminRole' })

  return (
    <div className="space-y-4">
      <Tabs
        items={[
          { id: 'child', label: 'Child' },
          { id: 'guardian', label: 'Guardian' },
          { id: 'admin', label: 'Admin' },
        ]}
        value={tab}
        onChange={(value) => setTab(value as 'child' | 'guardian' | 'admin')}
        className=""
      />

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 border-b border-[#2B6AB0] bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-[#444444]">{activeRowsAndCols.title}</h2>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-[360px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E2B45]/20"
                placeholder={activeRowsAndCols.placeholder}
              />
            </div>

            <div className="hidden h-6 w-px mx-3 bg-slate-300 sm:block" aria-hidden="true" />

            <Button
              className="h-10 rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => {
                if (tab === 'admin') setCreateAdminOpen(true)
              }}
            >
              Add New
            </Button>
          </div>
        </div>

        {activeRowsAndCols.tab === 'child' && (
          <DataTable<ChildRow>
            columns={activeRowsAndCols.columns as Array<ColumnDef<ChildRow>>}
            rows={sortedRows as ChildRow[]}
            sort={sort}
            onSortChange={setSort}
            getRowKey={(r) => r.id}
            minWidthClassName="min-w-[1100px]"
          />
        )}
        {activeRowsAndCols.tab === 'guardian' && (
          <DataTable<GuardianRow>
            columns={activeRowsAndCols.columns as Array<ColumnDef<GuardianRow>>}
            rows={sortedRows as GuardianRow[]}
            sort={sort}
            onSortChange={setSort}
            getRowKey={(r) => r.id}
            minWidthClassName="min-w-[1100px]"
          />
        )}
        {activeRowsAndCols.tab === 'admin' && (
          <DataTable<AdminRow>
            columns={activeRowsAndCols.columns as Array<ColumnDef<AdminRow>>}
            rows={sortedRows as AdminRow[]}
            sort={sort}
            onSortChange={setSort}
            getRowKey={(r) => r.id}
            minWidthClassName="min-w-[1100px]"
          />
        )}

        <div className="flex flex-col gap-3 px-3 py-2.5 text-[#222222] text-[14px] sm:flex-row sm:items-center sm:justify-between">
          <span className="whitespace-nowrap">
            Showing: {sortedRows.length} of {activeRowsAndCols.rows.length}
          </span>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            <button className="rounded-md border border-slate-200 px-3 py-2 text-slate-400" disabled>
              Previous
            </button>
            <button className="rounded-md bg-[#2B6AB0] px-4 py-2 text-white">1</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-slate-400" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Child modal */}
      <Modal
        open={viewChildOpen}
        onClose={() => {
          setViewChildOpen(false)
          setSelectedChild(null)
        }}
        title="Child Details"
        description="View profile, guardian, and device information"
        className="max-w-md sm:max-w-lg"
        bodyClassName="px-3 py-4 sm:px-4"
        scroll="always"
      >
        {selectedChild && (() => {
          return (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3 border-b border-slate-200 px-3 py-3">
                  <User className="h-5 w-5 text-[#0EA5A4]" />
                  <span className="text-sm font-semibold text-slate-900">Basic Information</span>
                </div>

                <div className="grid grid-cols-1 gap-4 px-3 py-3 sm:grid-cols-4 sm:items-center">
                  <div className="flex items-center gap-3 sm:col-span-1">
                    <div className="h-14 w-14 rounded-full bg-slate-200 ring-2 ring-white shadow-sm" />
                  </div>
                  <div className="sm:col-span-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-slate-500">Name</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                          {selectedChild.childName}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Age</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                          {selectedChild.age} yrs
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Gender</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                          {selectedChild.gender}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3 border-b border-slate-200 px-3 py-3">
                  <Users className="h-5 w-5 text-[#0EA5A4]" />
                  <span className="text-sm font-semibold text-slate-900">Guardian Information</span>
                </div>

                <div className="grid grid-cols-1 gap-4 px-3 py-3 sm:grid-cols-4 sm:items-center">
                  <div className="flex items-center gap-3 sm:col-span-1">
                    <div className="h-14 w-14 rounded-full bg-slate-200 ring-2 ring-white shadow-sm" />
                  </div>
                  <div className="sm:col-span-3">
                    <div>
                      <div className="text-xs text-slate-500">Guardian Name</div>
                      <div className="mt-1 text-lg font-semibold text-slate-900">
                        {selectedChild.guardianName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3 border-b border-slate-200 px-3 py-3">
                  <Watch className="h-5 w-5 text-[#0EA5A4]" />
                  <span className="text-sm font-semibold text-slate-900">Device Information</span>
                </div>

                <div className="grid grid-cols-1 gap-6 px-3 py-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-slate-500">Device Name</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      {selectedChild.deviceName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Device ID</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      {selectedChild.deviceId}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="text-xs text-slate-500">Device ID</div>
                    <div className="mt-2">
                      <Badge
                        variant={
                          selectedChild.deviceStatus === 'Connected'
                            ? 'success'
                            : selectedChild.deviceStatus === 'Not Connected'
                              ? 'warning'
                              : 'neutral'
                        }
                      >
                        {selectedChild.deviceStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
      </Modal>

      {/* View Guardian modal */}
      <Modal
        open={viewGuardianOpen}
        onClose={() => {
          setViewGuardianOpen(false)
          setSelectedGuardian(null)
        }}
        title="Guardian Details"
        description="View profile details and information"
        className="max-w-md sm:max-w-lg"
        bodyClassName="px-3 py-4 sm:px-4"
        scroll="always"
      >
        {selectedGuardian && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-200 px-3 py-3">
                <Users className="h-5 w-5 text-[#0EA5A4]" />
                <span className="text-sm font-semibold text-slate-900">Guardian Information</span>
              </div>

              <div className="grid grid-cols-1 gap-4 px-3 py-3 sm:grid-cols-4 sm:items-start">
                <div className="flex items-center gap-3 sm:col-span-1">
                  <div className="h-14 w-14 rounded-full bg-slate-200 ring-2 ring-white shadow-sm" />
                </div>
                <div className="sm:col-span-3">
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-500">Guardian Name</div>
                      <div className="mt-1 text-base font-semibold text-slate-900">
                        {selectedGuardian.guardianName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Email ID</div>
                      <div className="mt-1 text-base font-semibold text-slate-900">
                        {selectedGuardian.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Phone Number</div>
                      <div className="mt-1 text-base font-semibold text-slate-900">
                        {selectedGuardian.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-200 px-3 py-3">
                <CreditCard className="h-5 w-5 text-[#0EA5A4]" />
                <span className="text-sm font-semibold text-slate-900">Subscription Information</span>
              </div>

              <div className="grid grid-cols-1 gap-6 px-3 py-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-slate-500">Status</div>
                  <div className="mt-2">
                    <Badge
                      variant={
                        selectedGuardian.subscription === 'Subscribed'
                          ? 'success'
                          : selectedGuardian.subscription === 'Paused'
                            ? 'warning'
                            : 'neutral'
                      }
                    >
                      {selectedGuardian.subscription}
                    </Badge>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Last active</div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span
                      className={
                        selectedGuardian.lastActiveLabel === 'Active'
                          ? 'h-2.5 w-2.5 rounded-full bg-emerald-500'
                          : selectedGuardian.lastActiveLabel === 'Recent'
                            ? 'h-2.5 w-2.5 rounded-full bg-sky-500'
                            : selectedGuardian.lastActiveLabel === 'Idle'
                              ? 'h-2.5 w-2.5 rounded-full bg-amber-500'
                              : 'h-2.5 w-2.5 rounded-full bg-slate-400'
                      }
                    />
                    <span className="font-semibold text-slate-700">
                      {selectedGuardian.lastActiveLabel}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-slate-500">{selectedGuardian.lastActiveTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Child modal (UI only) */}
      <Modal
        open={editChildOpen}
        onClose={() => setEditChildOpen(false)}
        title="Edit Child"
        description="Update profile, guardian, and device information"
        className="max-w-xl sm:max-w-2xl"
        bodyClassName="px-3 py-4 sm:px-4"
        scroll="always"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">Name</label>
              <input
                defaultValue={selectedChild?.childName ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Age</label>
              <input
                defaultValue={selectedChild ? String(selectedChild.age) : ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Gender</label>
              <input
                defaultValue={selectedChild?.gender ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Guardian Name</label>
              <input
                defaultValue={selectedChild?.guardianName ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Device Name</label>
              <input
                defaultValue={selectedChild?.deviceName ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Device ID</label>
              <input
                defaultValue={selectedChild?.deviceId ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" className="rounded-xl" onClick={() => setEditChildOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90" onClick={() => setEditChildOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Guardian modal (UI only) */}
      <Modal
        open={editGuardianOpen}
        onClose={() => setEditGuardianOpen(false)}
        title="Edit Guardian"
        description="Update profile details and subscription information"
        className="max-w-xl sm:max-w-2xl"
        bodyClassName="px-3 py-4 sm:px-4"
        scroll="always"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">Guardian Name</label>
              <input
                defaultValue={selectedGuardian?.guardianName ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Email ID</label>
              <input
                defaultValue={selectedGuardian?.email ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Phone Number</label>
              <input
                defaultValue={selectedGuardian?.phone ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Subscription</label>
              <input
                defaultValue={selectedGuardian?.subscription ?? ''}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" className="rounded-xl" onClick={() => setEditGuardianOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90" onClick={() => setEditGuardianOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Admin modal (Admin tab) */}
      <Modal
        open={createAdminOpen}
        onClose={() => setCreateAdminOpen(false)}
        title="Create Admin"
        description="Create an admin account and define their access level"
        className="max-w-4xl"
      >
        <form
          onSubmit={createAdminForm.handleSubmit(() => {
            setCreateAdminOpen(false)
          })}
          className="space-y-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div />
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">
                Account Status:
              </span>
              <button
                type="button"
                onClick={() =>
                  createAdminForm.setValue('accountStatus', !accountStatus)
                }
                className={[
                  'relative h-6 w-11 overflow-hidden rounded-full transition-colors',
                  accountStatus ? 'bg-emerald-500' : 'bg-slate-300',
                ].join(' ')}
                aria-label="Toggle account status"
              >
                <span
                  className={[
                    'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
                    accountStatus ? 'translate-x-5' : 'translate-x-0',
                  ].join(' ')}
                />
              </button>
              <span className="text-sm font-medium text-slate-700">
                {accountStatus ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Full Name
              </label>
              <input
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
                placeholder="Sarah Johnson"
                {...createAdminForm.register('fullName')}
              />
              {createAdminForm.formState.errors.fullName && (
                <p className="mt-1 text-xs text-red-600">
                  {createAdminForm.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">
                Email Address
              </label>
              <input
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
                placeholder="sarahjohn1334@gmail.com"
                {...createAdminForm.register('email')}
              />
              {createAdminForm.formState.errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {createAdminForm.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Admin Type
            </label>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(['Internal', 'External'] as const).map((t) => {
                const selected = adminType === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => createAdminForm.setValue('adminType', t)}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
                      selected
                        ? 'border-[#0EA5A4] bg-[#E6F7F7]'
                        : 'border-slate-200 bg-white',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'relative h-5 w-5 rounded-full border',
                        selected ? 'border-[#0EA5A4]' : 'border-slate-300',
                      ].join(' ')}
                    >
                      {selected && (
                        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5A4]" />
                      )}
                    </span>
                    <span className="font-medium text-slate-700">{t}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Admin Role
            </label>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Random Admin A',
                'Random Admin B',
                'Random Admin C',
                'Random Admin D',
                'Random Admin E',
                'Random Admin F',
              ].map((r) => {
                const selected = adminRole === r
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => createAdminForm.setValue('adminRole', r)}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
                      selected
                        ? 'border-[#0EA5A4] bg-[#E6F7F7]'
                        : 'border-slate-200 bg-white',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'relative h-5 w-5 rounded-full border',
                        selected ? 'border-[#0EA5A4]' : 'border-slate-300',
                      ].join(' ')}
                    >
                      {selected && (
                        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5A4]" />
                      )}
                    </span>
                    <span className="font-medium text-slate-700">{r}</span>
                  </button>
                )
              })}
            </div>
            {createAdminForm.formState.errors.adminRole && (
              <p className="mt-1 text-xs text-red-600">
                {createAdminForm.formState.errors.adminRole.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="h-11 w-40 rounded-xl"
              onClick={() => setCreateAdminOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 w-40 rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90"
            >
              Create New
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Admin modal */}
      <Modal
        open={viewAdminOpen}
        onClose={() => setViewAdminOpen(false)}
        title="Admin Details"
        description="Basic account information and status"
        className="max-w-4xl"
      >
        <div className="flex items-center justify-between">
          <div />
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">
              Account Status:
            </span>
            <div className="flex items-center gap-2">
              <span className="relative h-6 w-11 rounded-full bg-emerald-500">
                <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
              </span>
              <span className="text-sm font-medium text-slate-700">Active</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Full Name
            </label>
            <input
              disabled
              className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-[#E6F7F7] px-4 text-sm text-slate-700"
              value={selectedAdmin?.name ?? '-'}
              readOnly
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Email Address
            </label>
            <input
              disabled
              className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-[#E6F7F7] px-4 text-sm text-slate-700"
              value={selectedAdmin?.email ?? '-'}
              readOnly
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs font-semibold text-slate-600">
            Admin Type
          </label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-[#0EA5A4] bg-[#E6F7F7] px-4 py-3 text-sm">
              <span className="relative h-5 w-5 rounded-full border border-[#0EA5A4]">
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5A4]" />
              </span>
              <span className="font-medium text-slate-700">Internal</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <span className="relative h-5 w-5 rounded-full border border-slate-300" />
              <span className="font-medium text-slate-500">External</span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs font-semibold text-slate-600">
            Admin Role
          </label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Random Admin A',
              'Random Admin B',
              'Random Admin C',
              'Random Admin D',
              'Random Admin E',
              'Random Admin F',
            ].map((r) => {
              const selected = r === 'Random Admin B'
              return (
                <div
                  key={r}
                  className={[
                    'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
                    selected
                      ? 'border-[#0EA5A4] bg-[#E6F7F7]'
                      : 'border-slate-200 bg-white',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'relative h-5 w-5 rounded-full border',
                      selected ? 'border-[#0EA5A4]' : 'border-slate-300',
                    ].join(' ')}
                  >
                    {selected && (
                      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5A4]" />
                    )}
                  </span>
                  <span className="font-medium text-slate-700">{r}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="secondary"
            className="h-11 w-full rounded-xl sm:w-40"
            onClick={() => setViewAdminOpen(false)}
          >
            Cancel
          </Button>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              
              className="h-11 w-full border-[#B91C1C] text-[#B91C1C] bg-[#fef2f2] hover:bg-red-50 sm:w-40 rounded-xl"
            >
              Delete Admin
            </button>
            <Button
              className="h-11 w-full rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90 sm:w-40"
              onClick={() => {
                if (!selectedAdmin) return
                editAdminForm.reset({
                  fullName: selectedAdmin.name,
                  email: selectedAdmin.email,
                  accountStatus: selectedAdmin.status === 'Active',
                  adminType: 'Internal',
                  adminRole: 'Random Admin B',
                })
                setViewAdminOpen(false)
                setEditAdminOpen(true)
              }}
            >
              Edit Details
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Admin modal */}
      <Modal
        open={editAdminOpen}
        onClose={() => setEditAdminOpen(false)}
        title="Edit Admin"
        description="Update admin details and access"
        className="max-w-4xl"
      >
        <form
          onSubmit={editAdminForm.handleSubmit(() => setEditAdminOpen(false))}
          className="space-y-5"
        >
          <div className="flex items-center justify-between">
            <div />
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">
                Account Status:
              </span>
              <button
                type="button"
                onClick={() =>
                  editAdminForm.setValue('accountStatus', !editAccountStatus)
                }
                className={[
                  'relative h-6 w-11 overflow-hidden rounded-full transition-colors',
                  editAccountStatus ? 'bg-emerald-500' : 'bg-slate-300',
                ].join(' ')}
              >
                <span
                  className={[
                    'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
                    editAccountStatus ? 'translate-x-5' : 'translate-x-0',
                  ].join(' ')}
                />
              </button>
              <span className="text-sm font-medium text-slate-700">
                {editAccountStatus ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Full Name
              </label>
              <input
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#E6F7F7] px-4 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
                {...editAdminForm.register('fullName')}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">
                Email Address
              </label>
              <input
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-[#E6F7F7] px-4 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
                {...editAdminForm.register('email')}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Admin Type
            </label>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(['Internal', 'External'] as const).map((t) => {
                const selected = editAdminType === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => editAdminForm.setValue('adminType', t)}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
                      selected
                        ? 'border-[#0EA5A4] bg-[#E6F7F7]'
                        : 'border-slate-200 bg-white',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'relative h-5 w-5 rounded-full border',
                        selected ? 'border-[#0EA5A4]' : 'border-slate-300',
                      ].join(' ')}
                    >
                      {selected && (
                        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5A4]" />
                      )}
                    </span>
                    <span className="font-medium text-slate-700">{t}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Admin Role
            </label>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Random Admin A',
                'Random Admin B',
                'Random Admin C',
                'Random Admin D',
                'Random Admin E',
                'Random Admin F',
              ].map((r) => {
                const selected = editAdminRole === r
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => editAdminForm.setValue('adminRole', r)}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
                      selected
                        ? 'border-[#0EA5A4] bg-[#E6F7F7]'
                        : 'border-slate-200 bg-white',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'relative h-5 w-5 rounded-full border',
                        selected ? 'border-[#0EA5A4]' : 'border-slate-300',
                      ].join(' ')}
                    >
                      {selected && (
                        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5A4]" />
                      )}
                    </span>
                    <span className="font-medium text-slate-700">{r}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="secondary"
              className="h-11 w-full rounded-xl sm:w-40"
              onClick={() => setEditAdminOpen(false)}
            >
              Cancel
            </Button>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                className="h-11 w-full border-[#B91C1C] text-[#B91C1C] bg-[#fef2f2] hover:bg-red-50 sm:w-40 rounded-xl"
              >
                Delete Admin
              </button>
              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90 sm:w-40"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

