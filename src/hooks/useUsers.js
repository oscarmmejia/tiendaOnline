import { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";

/**
 * @returns {{ users: Object[], loading: boolean, error: string|null }}
 */
export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { users, loading, error };
}
