const API_URL = "https://api.escuelajs.co/api/v1/users";

export async function fetchUsers(limit = 40, signal) {
    const response = await fetch(`${API_URL}?limit=${limit}`, { signal });

    if (!response.ok) {
        throw new Error(`Error al obtener usuarios: HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.map(mapUser);
}

function mapUser(apiUser) {
    return {
        id: apiUser.id,
        avatar: apiUser.avatar,
        name: apiUser.name.toUpperCase().replace(/\s+/g, "_"),
    };
}
