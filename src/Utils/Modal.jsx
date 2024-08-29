import '../Style/modal.css';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </>
    );
}