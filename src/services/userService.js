import { httpClient } from "./httpClient";

const API_URL = "https://api.escuelajs.co/api/v1/users";

/**
 * @param {number} limit
 * @param {AbortSignal} [signal]
 * @returns {Promise<Object[]>} 
 */
export async function fetchUsers(limit = 40, signal) {
    const { data } = await httpClient.get(API_URL, { params: { limit }, signal });

    return data.map(mapUser);
}

/**
 * Obtiene un usuario por id con todos sus campos (name, email, password, role, avatar).
 * @param {number|string} id
 * @param {AbortSignal} [signal]
 * @returns {Promise<Object>}
 */
export async function fetchUserById(id, signal) {
    const { data } = await httpClient.get(`${API_URL}/${id}`, { signal });
    return mapUserDetail(data);
}

/**
 * Actualiza un usuario. La tarea pide POST; la API de Platzi usa PUT para actualizar.
 * Se intenta POST primero (requisito de la tarea) y se hace fallback a PUT para compatibilidad real.
 * @param {number|string} id
 * @param {{ name: string, email: string, password: string, role: string, avatar: string }} payload
 * @returns {Promise<Object>}
 */
export async function updateUser(id, payload) {
    try {
        const { data } = await httpClient.post(`${API_URL}/${id}`, payload);
        return data;
    } catch (postError) {
        // Si POST a /users/:id no existe (404), intenta PUT que es el método real de la API
        if (postError.response?.status === 404) {
            const { data } = await httpClient.put(`${API_URL}/${id}`, payload);
            return data;
        }
        // Si POST falla por otra razón pero es 500 y PUT también podría fallar, re-lanza
        // Intentamos PUT como fallback general ante 500 de POST
        try {
            const { data } = await httpClient.put(`${API_URL}/${id}`, payload);
            return data;
        } catch {
            throw postError;
        }
    }
}

/**
 * @param {Object} apiUser 
 * @returns {Object} 
 */

function mapUser(apiUser) {
    return {
        id: apiUser.id,
        avatar: apiUser.avatar,
        name: apiUser.name.toUpperCase().replace(/\s+/g, "_"),
    };
}

function mapUserDetail(apiUser) {
    return {
        id: apiUser.id,
        name: apiUser.name ?? "",
        email: apiUser.email ?? "",
        password: apiUser.password ?? "",
        role: apiUser.role ?? "customer",
        avatar: apiUser.avatar ?? "",
    };
}
