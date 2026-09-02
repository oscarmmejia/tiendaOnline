import { useState } from "react";
import UserCreateButton from "../../components/atoms/userCreateButton/UserCreateButton";
import UserCreateModal from "../../components/molecules/userCreateModal/UserCreateModal";
import { UserCard } from "../../components/users/UserCard";
import { useUsers } from "../../hooks/useUsers";
import { deleteUser } from "../../services/userService";
import "./Users.css";

const usersLimit = 8;

const getDeleteErrorMessage = (error) => {
  const apiMessage = error.response?.data?.message;

  if (Array.isArray(apiMessage)) {
    return apiMessage.join(". ");
  }

  return apiMessage || error.message || "No se pudo borrar el usuario";
};

const Users = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const { users, loading, error, refresh, addUser } = useUsers(usersLimit);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleUserCreated = (createdUser) => {
    addUser(createdUser);
    handleCloseCreateModal();
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "¿Seguro que quieres borrar este usuario?",
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setDeletingUserId(id);
      setDeleteError("");
      await deleteUser(id);
      refresh();
    } catch (deleteUserError) {
      setDeleteError(getDeleteErrorMessage(deleteUserError));
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <section className="users">
      <span className="usersTag">&gt; NET_RUNNER_LINK</span>
      <h1 className="usersTitle">NUESTROS CLIENTES</h1>
      <p className="usersDescription">
        Conectando nodos en la red OKYDOKY. Explora perfiles verificados de
        compradores de élite y entusiastas de las compras online del futuro.
      </p>

      <div className="usersActions">
        <UserCreateButton
          onClick={handleOpenCreateModal}
          disabled={loading}
        />
      </div>

      {loading && <p className="usersLoading">CONECTANDO...</p>}

      {error && <p className="usersError" role="alert">{error}</p>}

      {deleteError && (
        <p className="usersError" role="alert">{deleteError}</p>
      )}

      {!loading && !error && (
        <div className="usersGrid">
          {users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              avatar={user.avatar}
              name={user.name}
              onUserUpdated={refresh}
              onDelete={handleDelete}
              isDeleting={deletingUserId === user.id}
            />
          ))}
        </div>
      )}

      <UserCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onUserCreated={handleUserCreated}
      />
    </section>
  );
};

export default Users;
