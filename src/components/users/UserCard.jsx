import { useState } from "react";
import Modal from "../modal/Modal";
import UserEditForm from "./UserEditForm";
import "./UserCard.css";

const UserCard = ({
  id,
  avatar,
  name,
  onUserUpdated,
  onDelete,
  isDeleting = false,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSuccess = () => {
    if (onUserUpdated) onUserUpdated();
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="userCard">
        <div className="userCardAvatarWrapper">
          <img src={avatar} alt={name} className="userCardAvatar" />
        </div>
        <h3 className="userCardName">{name}</h3>
        <button
          type="button"
          className="userCardEditButton"
          onClick={handleOpenEditModal}
          aria-label={`Editar usuario ${name}`}
          disabled={isDeleting}
        >
          Editar
        </button>
        <button
          type="button"
          className="userCardDeleteButton"
          onClick={() => onDelete(id)}
          aria-label={`Borrar usuario ${name}`}
          aria-busy={isDeleting}
          disabled={isDeleting}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" />
          </svg>
        </button>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        {isEditModalOpen && (
          <UserEditForm
            userId={id}
            onClose={handleCloseEditModal}
            onSuccess={handleSuccess}
          />
        )}
      </Modal>
    </>
  );
};

export { UserCard };
