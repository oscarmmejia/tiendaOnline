import { useState, useEffect, useCallback } from "react";
import { isRequestCanceled } from "../services/httpClient";
import { fetchUsers } from "../services/userService";

/**
 * @param {number} limit numero maximo de usuarios a descargar
 * @returns {{ users: Object[], loading: boolean, error: string|null, refresh: () => void }}
 */
export function useUsers(limit) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    const refresh = useCallback(() => {
        setReloadKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const loadUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                setUsers(await fetchUsers(limit, controller.signal));
            } catch (fetchError) {
                if (!isRequestCanceled(fetchError)) {
                    setError(fetchError.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadUsers();

        return () => controller.abort();
    }, [limit, reloadKey]);

    return { users, loading, error, refresh };
}
