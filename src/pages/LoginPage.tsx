import { ArrowLeft } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/ui/button'
import { cn } from '../lib/cn'
import { useNavigate } from 'react-router-dom'

const emailSchema = z.object({
  email: z.string().email('Enter a valid email'),
})

const otpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{4}$/, 'Enter the 4-digit code'),
})

type EmailFormValues = z.infer<typeof emailSchema>
type OtpFormValues = z.infer<typeof otpSchema>

const RESEND_COUNTDOWN_SEC = 24

export function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [_emailForOtp, setEmailForOtp] = useState('')
  const [resendSeconds, setResendSeconds] = useState(RESEND_COUNTDOWN_SEC)
  const navigate = useNavigate()

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
    reValidateMode: 'onChange',
  })

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
    reValidateMode: 'onChange',
  })

  const otpValue = useWatch({ control: otpForm.control, name: 'otp' }) ?? ''
  const emailValue = useWatch({ control: emailForm.control, name: 'email' }) ?? ''
  const isEmailValid = useMemo(() => {
    const t = emailValue.trim()
    if (!t) return false
    return emailSchema.safeParse({ email: t }).success
  }, [emailValue])

  const { errors: emailErrors } = emailForm.formState
  const { errors: otpErrors } = otpForm.formState
  const emailFieldError = emailErrors.email
  const otpFieldError = otpErrors.otp

  const otpDigits = useMemo(() => {
    const v = otpValue
    const padded = (v + '____').slice(0, 4)
    return padded.split('').map((ch) => (ch === '_' ? '' : ch))
  }, [otpValue])

  const otpRefs = useRef<Array<HTMLInputElement | null>>([])

  const setOtpAt = (idx: number, digit: string) => {
    const next = [...otpDigits]
    next[idx] = digit
    otpForm.setValue('otp', next.join(''), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  useEffect(() => {
    if (step !== 'otp') return
    const id = window.setInterval(() => {
      setResendSeconds((s) => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [step])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 bg-[url('/Images/BG/bg.jpg')] bg-no-repeat bg-size-[100%_100%] px-4">

      {/* Back button on background (OTP only) */}
      {step === 'otp' && (
        <button
          type="button"
          className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white shadow-md ring-1 ring-white/40 sm:left-6 sm:top-6 sm:h-12 sm:w-12"
          aria-label="Back"
          onClick={() => {
            setStep('email')
            otpForm.reset()
          }}
        >
          <ArrowLeft className="h-5 w-5 text-slate-700 sm:h-6 sm:w-6" />
        </button>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center py-8 sm:py-10">
        <div className="relative w-full rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-white/40 sm:p-7">
          <div className="flex flex-col items-center text-center">
            <img
              src="/Images/logo/logo.png"
              alt="AIKI"
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:mt-4 sm:text-3xl">
              {step === 'email' ? 'Welcome to Aiki' : 'Waiting For Verification'}
            </h1>
            <p className="mt-2 max-w-md text-[18px] font-medium text-[#666666] sm:text-lg">
              {step === 'email'
                ? 'Sign in to manage system access and controls'
                : "We've sent a verification code to your email. Please enter it below to continue."}
            </p>
          </div>

          {step === 'email' ? (
            <form
              className="mt-8 space-y-5 sm:mt-10 sm:space-y-6"
              onSubmit={emailForm.handleSubmit(({ email }) => {
                setEmailForOtp(email)
                setResendSeconds(RESEND_COUNTDOWN_SEC)
                setStep('otp')
              })}
            >
              <div>
                <label className="text-base font-regular text-[#222222]">
                  Email Address / Phone number
                </label>
                <div className="relative mt-2">
                  <input
                    className={cn(
                      'h-12 w-full rounded-2xl pl-4 pr-12 text-sm outline-none transition-colors sm:h-14 sm:pl-6 sm:pr-14 sm:text-base',
                      '[&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a] [&:-webkit-autofill]:[transition:background-color_99999s_ease-out_0s]',
                      emailFieldError
                        ? 'border-2 border-[#FF1B45] bg-[#FFF4F4] text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#FF1B45]/25 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#FFF4F4_inset]'
                        : isEmailValid
                          ? 'border-2 border-[#0EA5A4] bg-[#f1ffff] text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0EA5A4]/25 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#f1ffff_inset]'
                          : 'border border-[#E0E0E0] bg-white text-slate-800 placeholder:text-[#888888] focus:ring-2 focus:ring-[#E0E0E0]/80 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#ffffff_inset]',
                    )}
                    placeholder="Enter your email or phone number"
                    {...emailForm.register('email')}
                  />
                  <div
                    className={cn(
                      'pointer-events-none absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg transition-colors',
                    )}
                  >
                    {emailFieldError ? (
                      <img src="/Images/icons/mail_default.png" alt="Email" className="h-6 w-6" />
                    ) : isEmailValid ? (
                      <img src="/Images/icons/mail_valid.png" alt="Email" className="h-6 w-6" />
                    ) : (
                      <img src="/Images/icons/mail_default.png" alt="Email" className="h-6 w-6" />
                    )}
                  </div>
                </div>
                {emailFieldError && (
                  <p className="mt-2 text-sm font-medium text-[#FF1B45]">
                    {emailFieldError.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="h-12 w-full bg-linear-to-r from-[#0EA5A4] to-[#0B4D7A] text-base font-semibold hover:opacity-95 sm:h-14 sm:text-lg rounded-xl"
              >
                Login
              </Button>

              {/* <div className="flex items-center gap-4 pt-1">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-sm text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-base text-slate-500 sm:gap-3 sm:text-lg">
                <span>Don’t have an account?</span>
                <button type="button" className="font-semibold text-[#0B4D7A] underline">
                  Create account
                </button>
              </div> */}
            </form>
          ) : (
            <form
              className="mt-8 space-y-5 sm:mt-10 sm:space-y-6"
              onSubmit={otpForm.handleSubmit(() => {
                navigate('/dashboard')
              })}
            >
              <div className="pt-2">
                <div className="flex items-center justify-center gap-4 sm:gap-10">
                  {otpDigits.map((d, idx) => {
                    const digitValid = d.length === 1 && /\d/.test(d)
                    return (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpRefs.current[idx] = el
                        }}
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => {
                          const digit = e.target.value.replace(/\D/g, '').slice(-1)
                          setOtpAt(idx, digit)
                          if (digit && idx < 3) otpRefs.current[idx + 1]?.focus()
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
                            otpRefs.current[idx - 1]?.focus()
                          }
                        }}
                        className={cn(
                          'h-14 w-14 rounded-2xl text-center text-3xl font-semibold text-slate-900 outline-none transition-colors sm:h-20 sm:w-20 sm:rounded-3xl sm:text-5xl',
                          '[&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a] [&:-webkit-autofill]:[transition:background-color_99999s_ease-out_0s]',
                          otpFieldError
                            ? 'border-2 border-[#FF1B45] bg-[#FFF4F4] focus:ring-4 focus:ring-[#FF1B45]/20 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#FFF4F4_inset]'
                            : digitValid
                              ? 'border-2 border-[#0EA5A4] bg-[#f1ffff] focus:ring-4 focus:ring-[#0EA5A4]/20 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#f1ffff_inset]'
                              : 'border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#E0E0E0]/80 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#ffffff_inset]',
                        )}
                      />
                    )
                  })}
                </div>

                {otpFieldError && (
                  <p className="mt-4 text-center text-sm font-medium text-[#FF1B45]">
                    {otpFieldError.message}
                  </p>
                )}

                <div className="mt-6 flex w-full flex-row flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1 text-base text-slate-600 sm:mt-8 sm:text-lg">
                  <span className="text-left text-base font-medium text-[#444444]">Didn’t receive the code?</span>
                  <button
                    type="button"
                    className={cn(
                      'shrink-0 text-right font-medium text-base',
                      resendSeconds > 0 ? 'cursor-not-allowed text-slate-500' : 'text-slate-700 hover:text-slate-900',
                    )}
                    disabled={resendSeconds > 0}
                    onClick={() => {
                      setResendSeconds(RESEND_COUNTDOWN_SEC)
                    }}
                  >
                    <span className='text-[#444444]'>Resend Code{' '}</span>
                    <span className="text-[#4d82bc]">({resendSeconds})</span>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-4 h-12 w-full bg-linear-to-r from-[#0EA5A4] to-[#0B4D7A] text-base font-semibold hover:opacity-95 sm:mt-6 sm:h-14 sm:text-lg rounded-xl"
              >
                Verify & Continue
              </Button>

            </form>
          )}
        </div>
      </div>
    </div>
  )
}

