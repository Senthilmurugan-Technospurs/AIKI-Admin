import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { UserManagementPage } from './pages/UserManagementPage'
import { DashboardPage } from './pages/DashboardPage'
import { RoleManagementPage } from './pages/RoleManagementPage'
import { SubscriptionManagementPage } from './pages/SubscriptionManagementPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { UnderConstructionPage } from './pages/UnderConstructionPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <AppShell>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UserManagementPage />} />
              <Route path="/roles" element={<RoleManagementPage />} />
              <Route path="/subscriptions" element={<SubscriptionManagementPage />} />
              <Route path="/under-construction" element={<UnderConstructionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  )
}

export default App
