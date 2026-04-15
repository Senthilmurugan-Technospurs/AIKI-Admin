import { AlertTriangle, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[65vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#E7F5FE] text-[#0071BC]">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-wide text-[#0071BC]">404 Error</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#222222] sm:text-3xl">Page Not Found</h1>
        <p className="mt-3 text-sm text-[#666666] sm:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            className="rounded-xl bg-[#0071BC] hover:bg-[#0071BC]/90"
            leftIcon={<Home className="h-4 w-4" />}
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
          <Button variant="secondary" className="rounded-xl" onClick={() => navigate('/login')}>
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  )
}

