import { useState } from "react";
import Modal from "../modal/Modal";
import "./UserCard.css";

const UserCard = ({ avatar, name }) => {
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
        {/* Modal content will be added here */}
      </Modal>
    </>
  );
};

export default UserCard;
