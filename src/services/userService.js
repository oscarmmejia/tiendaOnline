import { httpClient } from "./httpClient";

const usersApiUrl = "https://api.escuelajs.co/api/v1/users";

/**
 * @param {number} limit
 * @param {AbortSignal} [signal]
 * @returns {Promise<Object[]>} 
 */
export async function fetchUsers(limit = 40, signal) {
    const { data } = await httpClient.get(usersApiUrl, { params: { limit }, signal });

    return data.map(mapUser);
}

/**
 * Fetches one user with all editable fields.
 * @param {number|string} id
 * @param {AbortSignal} [signal]
 * @returns {Promise<Object>}
 */
export async function fetchUserById(id, signal) {
    const { data } = await httpClient.get(`${usersApiUrl}/${id}`, { signal });
    return mapUserDetail(data);
}

/**
 * Creates a user through the users API route.
 * @param {{ name: string, email: string, password: string, role: string, avatar: string }} payload
 * @param {AbortSignal} [signal]
 * @returns {Promise<Object>}
 */
export async function createUser(payload, signal) {
    const { data } = await httpClient.post(usersApiUrl, payload, { signal });
    return mapUser(data);
}

/**
 * Updates a user. The existing flow tries POST first and falls back to the API's PUT route.
 * @param {number|string} id
 * @param {{ name: string, email: string, password: string, role: string, avatar: string }} payload
 * @returns {Promise<Object>}
 */
export async function updateUser(id, payload) {
    try {
        const { data } = await httpClient.post(`${usersApiUrl}/${id}`, payload);
        return data;
    } catch (postError) {
        if (postError.response?.status === 404) {
            const { data } = await httpClient.put(`${usersApiUrl}/${id}`, payload);
            return data;
        }

        try {
            const { data } = await httpClient.put(`${usersApiUrl}/${id}`, payload);
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
        name: String(apiUser.name ?? "").toUpperCase().replace(/\s+/g, "_"),
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

/**
 * Deletes a user through the users API route.
 * @param {number|string} id
 * @param {AbortSignal} [signal]
 * @returns {Promise<unknown>}
 */
export async function deleteUser(id, signal) {
    const { data } = await httpClient.delete(`${usersApiUrl}/${id}`, { signal });
    return data;
}
