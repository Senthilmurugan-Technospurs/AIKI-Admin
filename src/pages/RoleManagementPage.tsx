import { Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { DataTable, type ColumnDef, type SortState } from '../components/ui/data-table'
import { Modal } from '../components/ui/modal'
import { applySort } from '../lib/table'

type Row = {
  id: string
  roleName: string
  description: string
  permissions: number
  usersAssigned: number
  adminType: 'Internal' | 'External'
  createdOn: string
}

export function RoleManagementPage() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortState>({ key: 'roleName', direction: 'desc' })
  const [createOpen, setCreateOpen] = useState(false)
  const [userDetailsOpen, setUserDetailsOpen] = useState(false)
  const [activeRoleName, setActiveRoleName] = useState<string>('Admin B')

  const rows: Row[] = useMemo(
    () => [
      {
        id: '1',
        roleName: 'Super Admin',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
        permissions: 12,
        usersAssigned: 1,
        adminType: 'Internal',
        createdOn: '12 Feb 2026',
      },
      {
        id: '2',
        roleName: 'Admin A',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
        permissions: 8,
        usersAssigned: 4,
        adminType: 'Internal',
        createdOn: '10 Feb 2026',
      },
      {
        id: '3',
        roleName: 'Admin B',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
        permissions: 10,
        usersAssigned: 5,
        adminType: 'Internal',
        createdOn: '05 Feb 2026',
      },
      {
        id: '4',
        roleName: 'Admin C',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
        permissions: 8,
        usersAssigned: 6,
        adminType: 'Internal',
        createdOn: '23 Jan 2026',
      },
      {
        id: '5',
        roleName: 'Admin D',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
        permissions: 10,
        usersAssigned: 5,
        adminType: 'Internal',
        createdOn: '12 Jan 2026',
      },
      {
        id: '6',
        roleName: 'Admin E',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
        permissions: 8,
        usersAssigned: 6,
        adminType: 'Internal',
        createdOn: '10 Jan 2026',
      },
      {
        id: '7',
        roleName: 'Admin F',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
        permissions: 8,
        usersAssigned: 6,
        adminType: 'Internal',
        createdOn: '01 Jan 2026',
      },
    ],
    [],
  )

  const columns: Array<ColumnDef<Row>> = useMemo(
    () => [
      { key: 'roleName', header: 'Role Name', sortable: true, getValue: (r) => r.roleName },
      {
        key: 'description',
        header: 'Description',
        sortable: true,
        getValue: (r) => r.description,
        className: 'max-w-[420px]',
        cell: (r) => <span className="line-clamp-2 text-slate-600">{r.description}</span>,
      },
      {
        key: 'permissions',
        header: 'Permissions',
        sortable: true,
        getValue: (r) => r.permissions,
        cell: (r) => (
          <div className="group relative inline-block">
            <a className="cursor-default text-[#0E2B45] underline decoration-[#0E2B45]/40 underline-offset-4">
              {String(r.permissions).padStart(2, '0')} Permissions
            </a>

            <div className="pointer-events-none absolute left-0 top-7 z-20 hidden w-[280px] rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-200 group-hover:block">
              {[
                { name: 'Random Name 01', action: 'Full Access', variant: 'success' as const },
                { name: 'Random Name 02', action: 'View', variant: 'info' as const },
                { name: 'Random Name 03', action: 'View', variant: 'info' as const },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm font-medium text-slate-700">{p.name}</span>
                  <span
                    className={
                      p.variant === 'success'
                        ? 'rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white'
                        : 'rounded-md bg-sky-700 px-3 py-1 text-xs font-semibold text-white'
                    }
                  >
                    {p.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        key: 'usersAssigned',
        header: 'Users Assigned',
        sortable: true,
        getValue: (r) => r.usersAssigned,
        cell: (r) => (
          <button
            type="button"
            onClick={() => {
              setActiveRoleName(r.roleName)
              setUserDetailsOpen(true)
            }}
            className="text-slate-700 underline decoration-slate-300 underline-offset-4"
          >
            {String(r.usersAssigned).padStart(2, '0')} Users
          </button>
        ),
      },
      {
        key: 'adminType',
        header: 'Admin Type',
        sortable: true,
        getValue: (r) => r.adminType,
        cell: (r) => <Badge variant="success">{r.adminType}</Badge>,
      },
      { key: 'createdOn', header: 'Created on', sortable: true, getValue: (r) => r.createdOn },
      {
        key: 'actions',
        header: 'Quick Actions',
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
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      [r.roleName, r.description, r.adminType, r.createdOn].join(' ').toLowerCase().includes(q),
    )
  }, [query, rows])

  const sortedRows = useMemo(() => applySort(filtered, columns, sort), [filtered, columns, sort])

  const createRoleSchema = z.object({
    roleName: z.string().min(2, 'Role name is required'),
    description: z.string().min(5, 'Description is required'),
    adminType: z.enum(['Internal', 'External']),
    permissions: z.array(
      z.object({
        name: z.string(),
        view: z.boolean(),
        edit: z.boolean(),
        fullAccess: z.boolean(),
      }),
    ),
  })

  type CreateRoleForm = z.infer<typeof createRoleSchema>

  const form = useForm<CreateRoleForm>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      roleName: '',
      description: '',
      adminType: 'Internal',
      permissions: [
        { name: 'Random Name 01', view: true, edit: true, fullAccess: true },
        { name: 'Random Name 02', view: true, edit: true, fullAccess: true },
        { name: 'Random Name 03', view: true, edit: false, fullAccess: false },
        { name: 'Random Name 04', view: true, edit: false, fullAccess: false },
      ],
    },
  })
  const adminType = useWatch({ control: form.control, name: 'adminType' })
  const permissions = useWatch({ control: form.control, name: 'permissions' })

  return (
    <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="flex flex-col gap-3 border-b border-[#2B6AB0] bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-[#444444]">Role List</h2>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-[360px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E2B45]/20"
                placeholder="Search by role"
              />
            </div>

            <div className="hidden h-6 w-px mx-3 bg-slate-300 sm:block" aria-hidden="true" />

            <Button
              className="h-10 rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setCreateOpen(true)}
            >
              Add New
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={sortedRows}
          sort={sort}
          onSortChange={setSort}
          getRowKey={(r) => r.id}
          minWidthClassName="min-w-[1100px]"
        />

        <div className="flex flex-col gap-3 px-3 py-2.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span className="whitespace-nowrap">Showing: {sortedRows.length} of {rows.length}</span>
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

      {/* User Details modal */}
      <Modal
        open={userDetailsOpen}
        onClose={() => setUserDetailsOpen(false)}
        title="User Details"
        description={`View all admins associated with this role${activeRoleName ? ` (${activeRoleName})` : ''}`}
        className="max-w-5xl"
      >
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-[#2E6A86]">
              <tr>
                {['Name', 'Email ID', 'Status', 'Role', 'Last Active', 'Quick Actions'].map((h) => (
                  <th key={h} className={`whitespace-nowrap px-3 py-2.5 ${h === 'Quick Actions' ? 'text-center' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="text-slate-700">
                <td className="px-3 py-2.5 text-[#222222] text-[14px]">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 text-xs font-semibold text-purple-700 grid place-items-center">
                      JS
                    </div>
                    <span className="font-medium text-[#222222] text-[14px]">John Smith</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-[#222222] text-[14px]">john.smith@gmail.com</td>
                <td className="px-3 py-2.5 text-[#222222] text-[14px]">
                  <Badge variant="success">Active</Badge>
                </td>
                <td className="px-3 py-2.5 text-[#222222] text-[14px]">
                  <Badge variant="danger">Super Admin</Badge>
                </td>
                <td className="px-3 py-2.5 text-[#222222] text-[14px]">2 hrs ago</td>
                <td className="px-3 py-2.5 text-[#222222] text-[14px] text-center">
                  <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit">
                    <img src="/Images/icons/edit.png" alt="Edit" className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Create Role modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create New Role"
        description="Set a role and choose access permissions"
        className="max-w-3xl"
        scroll="always"
      >
        <form
          onSubmit={form.handleSubmit(() => {
            setCreateOpen(false)
          })}
          className="space-y-5"
        >
          <div>
            <label className="text-xs font-semibold text-slate-600">Role Name</label>
            <input
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              placeholder="Admin D"
              {...form.register('roleName')}
            />
            {form.formState.errors.roleName && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.roleName.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Description</label>
            <textarea
              className="mt-2 min-h-[88px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0EA5A4]/30"
              placeholder="Brief description of the role responsibility"
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Admin Type</label>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(['Internal', 'External'] as const).map((t) => {
                const selected = adminType === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => form.setValue('adminType', t)}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
                      selected
                        ? 'border-[#0EA5A4] bg-[#E6F7F7]'
                        : 'border-slate-200 bg-white',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'grid h-5 w-5 place-items-center rounded-full border',
                        selected ? 'border-[#0EA5A4]' : 'border-slate-300',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'h-2.5 w-2.5 rounded-full',
                          selected ? 'bg-[#0EA5A4]' : 'bg-transparent',
                        ].join(' ')}
                      />
                    </span>
                    <span className="font-medium text-slate-700">{t}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Permissions</label>
            <div className="mt-2 space-y-3">
              {permissions.map((p, idx) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-medium text-slate-700">{p.name}</span>
                    <div className="flex flex-wrap gap-6 text-sm font-semibold">
                      {(['view', 'edit', 'fullAccess'] as const).map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() =>
                            form.setValue(
                              `permissions.${idx}.${k}`,
                              !(permissions[idx]?.[k] ?? false),
                            )
                          }
                          className="inline-flex items-center gap-3"
                        >
                          <span
                            className={[
                              'grid h-6 w-6 place-items-center rounded-md border-2 transition-colors',
                              permissions[idx]?.[k]
                                ? 'border-[#0EA5A4] bg-[#0EA5A4]'
                                : 'border-slate-500 bg-white',
                            ].join(' ')}
                          >
                            {permissions[idx]?.[k] && (
                              <span className="text-white text-base leading-none">✓</span>
                            )}
                          </span>
                          <span
                            className={
                              permissions[idx]?.[k]
                                ? 'text-[#0EA5A4]'
                                : 'text-slate-600'
                            }
                          >
                            {k === 'fullAccess'
                              ? 'Full Access'
                              : k[0].toUpperCase() + k.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="h-11 w-40 rounded-xl"
              onClick={() => setCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-11 w-40 rounded-xl bg-[#0EA5A4] hover:bg-[#0EA5A4]/90">
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

