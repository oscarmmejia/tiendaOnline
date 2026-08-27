import { useUsers } from "../../hooks/useUsers";
import UserCard from "./UserCard";
import "./Users.css";

const Users = () => {
    const { users, loading, error } = useUsers(8);

    return (
        <section className="users">
            <span className="usersTag">&gt; NET_RUNNER_LINK</span>
            <h1 className="usersTitle">DIRECTORIO DE USUARIOS</h1>
            <p className="usersDescription">
                Conectando nodos en la red OKYDOKY. Explora perfiles verificados de
                compradores de élite y entusiastas de las compras online del futuro.
            </p>

                <div className="usersGrid">
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            avatar={user.avatar}
                            name={user.name}
                        />
                    ))}
                </div>
            

            <button className="usersLoadMore">&gt; CARGAR MÁS USUARIOS</button>
        </section>
    );
};

export default Users;