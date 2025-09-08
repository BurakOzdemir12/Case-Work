import type {Post} from "../types/Post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (page: number): Promise<Post[]> => {
    const response = await fetch(`${BASE_URL}/posts?_page=${String(page)} &_limit=10`);
    if (!response.ok) {
        throw new Error("Error fetching posts");
    }
    return response.json() as Promise<Post[]>;
};

export const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {

    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPost),
    });
    return response.json() as Promise<Post>;
}
export const updatePost = async (post: Post): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/posts/${String(post.id)}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post),
    });
    return response.json() as Promise<Post>;
}
export const deletePost = async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/posts/${String(id)}`, {
        method: "DELETE",
    });
};