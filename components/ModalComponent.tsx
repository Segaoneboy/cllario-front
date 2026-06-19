"use client"
import { useEffect,useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children}: ModalProps){

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(()=>{
        const dialog = dialogRef.current;
        if(!dialog) return;

        if(isOpen){
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        }else{
            dialog.close();
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleCloseOverlayClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if(e.target === dialogRef.current){
            onClose();
        }
    }
    return(
        <dialog 
            ref={dialogRef}
            onClose={onClose}
            onClick={handleCloseOverlayClick}
            className="backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-lg p-6 max-w-md w-full shadow-2xl open:animate-fade-in"
        >
            <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold">{title || 'Модальное окно'}</h3>
                <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 transition-colors text-xl font-bold"
                >
                &times;
                </button>
            </div>

            {/* Контент */}
            <div className="text-gray-600">
                {children}
            </div>
            </div>
        </dialog>
    )
}