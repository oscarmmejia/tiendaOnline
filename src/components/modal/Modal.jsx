import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
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
