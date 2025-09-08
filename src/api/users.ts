import type {User} from "../types/User.ts";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async (page: number): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users?_page=${String(page)} &_limit=10`);
    if (!response.ok) {
        throw new Error("Error fetching users");
    }
    return response.json() as Promise<User[]>;
}

export const createUser = async (newUser: Omit<User, "id">): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newUser),
    });
    return response.json() as Promise<User>;
}

export const updateUser = async (user: User): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${String(user.id)}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
    });
    return response.json() as Promise<User>;
}

export const deleteUser = async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/users/${String(id)}`, {
        method: "DELETE",
    })
}