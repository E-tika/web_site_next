import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if ((event.target as Element).id === 'modal-overlay') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return createPortal(
        <div
            id="modal-overlay"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="bg-white p-6 rounded shadow-lg w-3/4 h-4/5 overflow-y-auto relative">
                <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
