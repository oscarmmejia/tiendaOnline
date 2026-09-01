import { useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";
<<<<<<< HEAD:src/pages/usersPage/Users.jsx
import UserCard from "../../components/users/UserCard";
=======
import { login } from "../../services/httpClient";
import { deleteUser } from "../../services/userService";
import { UserCard } from "./UserCard";
>>>>>>> feat/delete-users:src/components/users/Users.jsx
import "./Users.css";

const USERS_LIMIT = 8;

const Users = () => {
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
        </section>
    );
};

export default Users;
