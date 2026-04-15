import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  scroll?: 'auto' | 'always'
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  bodyClassName,
  scroll = 'auto',
}: ModalProps) {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close modal overlay"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            'relative flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-slate-200 max-h-[90vh]',
            className,
          )}
        >
          <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
            <div>
              {title && (
                <h3 className="text-xl font-semibold text-[#222222]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-[14px] font-medium text-[#444444]">{description}</p>
              )}
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Close modal"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scroll behavior */}
          <div
            className={cn(
              'px-5 py-5',
              bodyClassName,
              scroll === 'always'
                ? 'min-h-0 flex-1 overflow-auto'
                : 'max-h-[80vh] overflow-auto sm:max-h-none sm:overflow-visible',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

