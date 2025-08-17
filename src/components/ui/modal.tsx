import type { ReactNode } from "react"

interface ModalProps {
    children: ReactNode
    onClose: () => void
}

export const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className="absolute top-0 min-h-[1000px] w-full">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 z-50 h-full w-full"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className="absolute bottom-[150px] z-50 flex justify-center items-center w-full"
            >
                <div className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl 
                                flex justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    )
}