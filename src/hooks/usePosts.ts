import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createPost, deletePost, fetchPosts, updatePost} from "../api/posts.ts";
import type {Post} from "../types/Post";

export const usePosts = (page: number) => {
    return useQuery<Post[]>({
        queryKey: ["posts", page],
        queryFn: () => fetchPosts(page),
        staleTime: 60_000,
    });
};

export const usePostMutations = (page:number) => {
    const queryClient = useQueryClient();

    return {
        create: useMutation({
            mutationFn: createPost,
            onSuccess: (data) => {
                queryClient.setQueryData<Post[]>(["posts",page], (old = []) => [data, ...old])
            },
            onError: (error) => {
                console.error("Error creating post:", error);
            }
        }),
        update: useMutation({
            mutationFn: updatePost,
            onSuccess: (data) => {
                queryClient.setQueryData<Post[]>(["posts",page], (old = []) =>
                    old.map((post) => (post.id === data.id ? data : post))
                );
            }
        }),
        delete: useMutation({
            mutationFn: deletePost,
            onSuccess: (_, id) => {
                queryClient.setQueryData<Post[]>(["posts",page], (old = []) =>
                    old.filter((post) => post.id !== id)
                );
            },
        }),
    }
}