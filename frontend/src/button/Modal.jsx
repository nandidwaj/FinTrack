import "../styles/modal.css"

function Modal({isOpen,onClose,children}){
    if(!isOpen) return null;

    return(
        <div className="modal-overlay">
            <div className="modal-box">
                <span className="modal-close" onClick={onClose}>x</span>
                {children}
            </div>
        </div>
    );
}

export default Modal;