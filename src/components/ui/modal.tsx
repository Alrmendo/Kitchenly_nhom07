import type { ReactNode } from "react"

interface ModalProps {
    children: ReactNode
    onClose: () => void
    counter?: number
}

export const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
            onClick={onClose}>
            {/* Modal Content */}
            <div
                className="w-full max-w-lg bg-white rounded-t-3xl shadow-2xl animate-slide-up"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                {children}
            </div>
        </div>
    )
}