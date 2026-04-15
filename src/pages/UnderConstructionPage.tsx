import { Construction, Hammer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

export function UnderConstructionPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[65vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#EAF7EE] text-[#29C18E]">
            <Construction className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#222222] sm:text-3xl">
            Under Construction
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#666666] sm:text-base">
            This section is currently being built. We are working to make it available soon.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
          <div className="flex items-center gap-3 text-[#444444]">
            <Hammer className="h-5 w-5 text-[#0071BC]" />
            <p className="text-sm sm:text-base">Feature rollout is in progress.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            className="rounded-xl bg-[#0071BC] hover:bg-[#0071BC]/90"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

