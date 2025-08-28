import type { ReactNode } from "react"

interface ModalProps {
    children: ReactNode
    onClose: () => void
    counter?: number
}

export const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className={`absolute h-[100vh] w-full z-0 flex flex-col-reverse bg-black/40`}
            onClick={onClose}>
            {/* Modal Content */}
            <div
                className={`z-100 flex justify-center items-center w-full`}
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl 
                                flex justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    )
}