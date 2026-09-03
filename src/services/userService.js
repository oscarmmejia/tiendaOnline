import { httpClient } from "./httpClient";

const USERS_API_URL = "https://api.escuelajs.co/api/v1/users";

export async function fetchUsers(limit = 40, signal) {
    const { data: usersData } = await httpClient.get(USERS_API_URL, { params: { limit }, signal });

    return usersData.map(mapUser);
}

export async function fetchUserById(id, signal) {
    const { data: userData } = await httpClient.get(`${USERS_API_URL}/${id}`, { signal });
    return mapUserDetail(userData);
}

export async function createUser(payload, signal) {
    const { data: createdUserData } = await httpClient.post(USERS_API_URL, payload, { signal });
    return mapUser(createdUserData);
}

export async function updateUser(id, payload) {
    const { data: updatedUser } = await httpClient.put(`${USERS_API_URL}/${id}`, payload);
    return updatedUser;
}

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

export async function deleteUser(id, signal) {
    const { data: deletedResult } = await httpClient.delete(`${USERS_API_URL}/${id}`, { signal });
    return deletedResult;
}
