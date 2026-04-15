import { useState, type ReactNode } from 'react'
import { Bell, Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { Button } from '../ui/button'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const header =
    pathname.startsWith('/roles')
      ? {
          title: 'Role Management',
          subtitle: 'Control access levels for internal and external admins',
        }
      : pathname.startsWith('/subscriptions')
        ? {
            title: 'Subscription Management',
            subtitle: 'Manage guardians subscriptions and metrics',
          }
        : pathname.startsWith('/dashboard')
          ? {
              title: 'Dashboard',
              subtitle: 'Overview of platform activity and system status',
            }
          : {
              title: 'User Management',
              subtitle: 'Manage guardians, children, and admin profiles',
            }

  const items = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      to: '/dashboard',
      icon: <img src="/Images/icons/dashboard.png" alt="Dashboard" className="h-[24px] w-[24px]" />,
    },
    {
      id: 'users',
      label: 'User Management',
      to: '/users',
      icon: <img src="/Images/icons/users.png" alt="Dashboard" className="h-[24px] w-[24px]" />,
    },
    {
      id: 'roles',
      label: 'Role Management',
      to: '/roles',
      icon: <img src="/Images/icons/role.png" alt="Dashboard" className="h-[24px] w-[24px]" />,
    },
    {
      id: 'subscriptions',
      label: 'Subscription Management',
      to: '/subscriptions',
      icon: <img src="/Images/icons/subscription.png" alt="Dashboard" className="h-[24px] w-[24px]" />,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar
            collapsed
            items={items}
            header={
              <div className="flex w-full flex-col items-center py-1 overflow-visible">
                <div className="grid h-[60px] w-[60px] place-items-center overflow-hidden">
                  <img
                    src="/Images/logo/sidebar_logo.png"
                    alt="AIKI"
                    className="h-full w-full object-contain scale-[0.65]"
                  />
                </div>
                <div className="mt-2 h-[3px] w-10 rounded-full bg-slate-400/40" />
              </div>
            }
            footer={
              <div className="flex justify-center">
                <img src="/Images/icons/settings.png" alt="Settings" className="h-[24px] w-[24px]" />
              </div>
            }
          />
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close sidebar overlay"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 shadow-xl">
              <Sidebar
                items={items}
                onSelect={() => {
                  setMobileOpen(false)
                }}
                header={
                  <div className="flex w-full items-center justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src="/Images/logo/logo.png"
                        alt="AIKI"
                        className="h-9 w-9 object-contain"
                      />
                      <span className="truncate text-base font-semibold text-white">
                        AIKI Admin
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-200 hover:bg-slate-900/60"
                      onClick={() => setMobileOpen(false)}
                      aria-label="Close sidebar"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                }
                footer={
                  <div className="flex w-full items-center gap-3 rounded-none px-3 py-3 text-slate-300 hover:bg-slate-900/60 hover:text-white">
                    <img src="/Images/icons/settings.png" alt="Settings" className="h-[24px] w-[24px]" />
                    <span className="text-sm font-medium">Settings</span>
                  </div>
                }
              />
            </div>
          </div>
        )}

        {/* Main column */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar
            title={header.title}
            subtitle={header.subtitle}
            left={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5 text-slate-700" />
              </Button>
            }
            actions={
              <>
                <button
                  type="button"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 text-slate-700" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>
                <div className="relative group flex items-center gap-3">
                  <button
                    type="button"
                    className="grid h-10 w-10 place-items-center rounded-full bg-slate-300 text-base font-semibold text-slate-700"
                    aria-label="Signed-in user initials"
                  >
                    SM
                  </button>
                  <button
                    type="button"
                    className="pointer-events-none absolute right-0 top-11 z-20 min-w-[92px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 opacity-0 shadow-md transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-slate-50"
                    onClick={() => navigate('/login')}
                  >
                    Logout
                  </button>
                </div>
              </>
            }
          />

          <main className="min-w-0 flex-1 px-2 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

