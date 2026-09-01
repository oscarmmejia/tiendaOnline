import Modal from "../../modal/Modal";
import UserCreateForm from "../userCreateForm/UserCreateForm";

const UserCreateModal = ({ isOpen, onClose, onUserCreated }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {isOpen && (
      <UserCreateForm onCancel={onClose} onSuccess={onUserCreated} />
    )}
  </Modal>
);

export default UserCreateModal;
