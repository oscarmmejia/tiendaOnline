import { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";

/**
 * @param {number} limit numero maximo de usuarios a descargar
 * @returns {{ users: Object[], loading: boolean, error: string|null }}
 */
export function useUsers(limit) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers(limit)
            .then(setUsers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [limit]);

    return { users, loading, error };
}
