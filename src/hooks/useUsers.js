import { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";

export function useUsers(limit) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadUsers = async () => {
            try {
                setUsers(await fetchUsers(limit, controller.signal));
            } catch (fetchError) {
                if (fetchError.name !== "AbortError") {
                    setError(fetchError.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadUsers();

        return () => controller.abort();
    }, [limit]);

    return { users, loading, error };
}
