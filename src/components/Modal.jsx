import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <span className='btn btn-close'></span> {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;