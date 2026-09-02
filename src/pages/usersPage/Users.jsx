import { useState } from "react";
import UserCreateButton from "../atoms/userCreateButton/UserCreateButton";
import UserCreateModal from "../molecules/userCreateModal/UserCreateModal";
import { useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";
import { UserCard } from "../../components/users/UserCard"; import { login } from "../../services/httpClient";
import { deleteUser } from "../../services/userService";
import "./Users.css";

const usersLimit = 8;

const Users = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    const { users, loading, error, refresh } = useUsers(USERS_LIMIT);
    useEffect(() => {
        const init = async () => {
            try {
                await login("[EMAIL_ADDRESS]", "12345678");
            } catch (error) {
                console.error("Login failed:", error);
            }
        };

        init();
    }, []);
    const handleDelete = async (id) => {
        await login("john@mail.com", "changeme");
        await deleteUser(id);
        refresh();
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

            {error && <p className="usersError">{error}</p>}

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
