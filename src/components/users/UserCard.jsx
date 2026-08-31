import { useState } from "react";
import Modal from "../modal/Modal";
import UserEditForm from "./UserEditForm";
import "./UserCard.css";

const UserCard = ({ id, avatar, name }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
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
          className="userCardEditButton"
          onClick={handleOpenEditModal}
          aria-label={`Editar usuario ${name}`}
        >
          Editar
        </button>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        {isEditModalOpen && (
          <UserEditForm
            userId={id}
            onClose={handleCloseEditModal}
            onSuccess={handleCloseEditModal}
          />
        )}
      </Modal>
    </>
  );
};

export default UserCard;
