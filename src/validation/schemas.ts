import {z} from "zod";

export const PostFormSchema = z.object({
    title: z.string().trim().min(2, "Title must be at least 2 characters long")
        .max(100, "Title must be at most 100 characters long"),
    body: z.string().trim().min(5, "Post must be at least 2 characters long")
        .max(1000, "Post must be at most 1000 characters long"),
});

export type PostFormValues = z.infer<typeof PostFormSchema>;

export const UserFormSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be at most 50 characters long"),
    username: z.string().trim().min(2, "Username must be at least 2 characters long")
        .max(50, "Username must be at most 50 characters long"),
    email: z.email("Invalid email address"),
});
export type UserFormValues = z.infer<typeof UserFormSchema>;
