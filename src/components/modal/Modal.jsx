import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modalBackdrop" onClick={handleBackdropClick}>
      <div className="modalContent">
        <button className="modalCloseButton" onClick={onClose} aria-label="Cerrar modal">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
