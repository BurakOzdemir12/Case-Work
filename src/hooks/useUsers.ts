import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {User} from "../types/User.ts";
import {createUser, deleteUser, fetchUsers, updateUser} from "../api/users.ts";

export const useUsers = (page: number) => {
    return useQuery<User[]>({
        queryKey: ["users", page],
        queryFn: () => fetchUsers(page),
        staleTime: 1000 * 60,
    })
}

export const useUserMutations = (page: number) => {
    const queryClient = useQueryClient();
    return {
        create: useMutation({
            mutationFn: createUser,
            onSuccess: (data) => {
                queryClient.setQueryData<User[]>(["users", page], (old = []) => [data, ...old])
            },
            onError: (error) => {
                console.error("Error creating user:", error);
            }
        }),
        update: useMutation({
            mutationFn: updateUser,
            onSuccess: (data) => {
                queryClient.setQueryData<User[]>(["users", page], (old = []) =>
                    old.map((user) => (user.id === data.id ? data : user))
                );
            },
        }),
        delete: useMutation({
            mutationFn: deleteUser,
                onSuccess: (_,id)=> {
                queryClient.setQueryData<User[]>(["users", page], (old: User[] = []) =>
                    old.filter((user: User) => user.id !== id)
                );
            },
        }),
    }
}

