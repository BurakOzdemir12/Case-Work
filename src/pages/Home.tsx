import  {useCallback, useState} from "react";
import {usePostMutations, usePosts} from "../hooks/usePosts.ts";
import {useUserMutations, useUsers} from "../hooks/useUsers.ts";
import PostEditDialog from "@/components/PostEditDialog.tsx";
import type {Post} from "@/types/Post.ts";
import {toast} from "sonner"
import PostTable from "@/components/PostTable.tsx";
import PostCard from "@/components/PostCard.tsx";
import UserTable from "@/components/UserTable.tsx";
import type {User} from "@/types/User.ts";
import UserEditDialog from "@/components/UserEditDialog.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {PostFormSchema, type PostFormValues, UserFormSchema, type UserFormValues} from "@/validation/schemas";
import {useForm} from "react-hook-form";

export default function Home() {

    const [page, setPage] = useState(1);

    const {create, update, delete: deletePost} = usePostMutations(page);
    const {create: createUser, update: updateUser, delete: deleteUser} = useUserMutations(page);

    //didnt needed cause using react hook form now
    // const [form, setForm] = useState({title: "", body: ""});
    // const [formUser, setUserForm] = useState({name: "", username: "", email: ""});

    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [isUserEditOpen, setIsUserEditOpen] = useState(false);
    const [isPostEditOpen, setIsPostEditOpen] = useState(false);

    const [deletingId, setDeletingId] = useState<number | null>(null);

    //Form Validations from zod schema
    const {

        register: registerPost,
        handleSubmit: handleSubmitPost,
        formState: {errors: postErrors, isSubmitting: postSubmitting},
        reset: resetPostForm,
    } = useForm<PostFormValues>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {title: "", body: ""},
        mode: "onTouched",
    });
    const {
        register: registerUser,
        handleSubmit: handleSubmitUser,
        formState: {errors: userErrors, isSubmitting: userSubmitting},
        reset: resetUserForm,
    } = useForm<UserFormValues>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {name: "", username: "", email: ""},
        mode: "onTouched",
    });
    const {
        data: posts,
        isLoading: postsLoading,
        error: postsError

    } = usePosts(page);
    const {
        data: users,
        isLoading: usersLoading,
        error: usersError
    } = useUsers(page);

    // Create Post Handle
    const handleCreatePost = (data: PostFormValues) => {
        create.mutate({title: data.title, body: data.body, userId: 1}, {
            onSuccess: () => {
                resetPostForm();
                // setForm({title: "", body: ""});
                toast.success("Post Added Successfully!");
            },
            onError: () => {
                toast.error("Error Adding post");
            }
        });
        console.log(create.data);
    };
    //Create User Handle
    const handleCreateUser = (data:UserFormValues) => {
        createUser.mutate({name: data.name, username: data.username, email: data.email}, {
            onSuccess: () => {
                resetUserForm();
                // setUserForm({name: "", username: "", email: ""});
                toast.success("User Added Successfully!");
            },
            onError: () => {
                toast.error("Error Adding User");

            }
        })
    }
    // Update post-Handle
    const openEditPost = (post: Post) => {
        setEditingPost(post);
        setIsPostEditOpen(true);
    };
    //Update User Handle
    const openEditUser = (user: User) => {
        setEditingUser(user);
        setIsUserEditOpen(true);
    }

    const handlePostSaveEdit = (data: { title: string; body: string }) => {
        if (!editingPost) return;
        update.mutate(

            {...editingPost, title: data.title, body: data.body},
            {
                onSuccess: () => {
                    setIsPostEditOpen(false);
                    setEditingPost(null);
                    toast.success("Post updated");
                },
                onError: () => toast.error("Failed to update"),
            }
        );
    };
    const handleUserSaveEdit = (data: { name: string; username: string; email: string }) => {
        if (!editingUser) return;
        updateUser.mutate(
            {...editingUser, name: data.name, username: data.username, email: data.email},
            {

                onSuccess: () => {
                    setIsUserEditOpen(false);
                    setEditingUser(null);
                    toast.success("User updated");
                },
                onError: () => toast.error("Failed to update"),
            }
        )
    }
    // Post DElete Handle
    const handlePostDelete = useCallback((id: number) => {
        setDeletingId(id);
        deletePost.mutate(id, {
            onSuccess: () => {
                toast.success("Post deleted")
                setDeletingId(null);
            },
            onError: () => {
                toast.error("Failed deleting post")
                setDeletingId(null)
            }
        })
    }, [deletePost]);
    //User Delete Handle
    const handleUserDelete = useCallback((id: number) => {
        setDeletingId(id);
        deleteUser.mutate(id, {
            onSuccess: () => {
                toast.success("User deleted")
                setDeletingId(null);
            },
            onError: () => {
                toast.error("Failed deleting user")
                setDeletingId(null);
            }
        })
    }, [deleteUser]);

    return (
        <div className="container   mx-auto my-auto">
            {postsError && <div>
                {toast.error("Error Adding post")}

            </div>}

            <div className=" md:grid md:grid-flow-col mx-2 gap-1 grid-cols-2    ">
                <div id="post-add" className="mt-5">
                    <h1 className="text-2xl mb-1 ">Add Post</h1>
                    <hr className="md:w-[75%]"/>

                    <form onSubmit={handleSubmitPost(handleCreatePost)}>
                    <span className="mt-5 mb-5 text-2xl font-bold flex flex-col gap-2">
                Title
            <input type="text" placeholder="Title"
                // value={form.title}
                   className={`h-10  w-min   ${postErrors.title ? "border-red-500" : "border-gray-300"}`}
                // onChange={(e) => {
                //     setForm({...form, title: e.target.value});
                // }}
                   {...registerPost("title")}
            />
                        {postErrors.title && <p className=" mb-4 text-sm text-red-600">{postErrors.title.message}</p>}

                </span>
                        <span className="mb-5  text-2xl font-bold flex flex-col gap-1">
                Post Text
            <textarea
                className={`border text-xl font-normal rounded-2xl p-2 h-40 md:w-[75%] xs:w-full 
                  mt-2 ${postErrors.body ? "border-red-500" : "border-gray-200"}`}
                placeholder="Please input Text"
                // if you want dont want to use Zod and react hook form use below code
                // value={form.body}
                // onChange={(e) => {
                //     setForm({...form, body: e.target.value});
                // }}
                {...registerPost("body")}
            />
                            {postErrors.body && <p className="mb-5 text-sm text-red-600">{postErrors.body.message}</p>}

                </span>
                        <button
                            disabled={postSubmitting || create.isPending}
                            type="submit"
                            className="cursor-pointer hover:bg-green-900 px-3 py-2 bg-green-600 text-white rounded"
                        >
                            {postSubmitting || create.isPending ? "Adding..." : "Add Post"}
                        </button>
                    </form>

                </div>
                <div className="mt-5 " id="user-add">
                    <h1 className="text-2xl mb-1 ">Add User</h1>
                    <hr className="md:w-[75%]"/>
                    <form onSubmit={handleSubmitUser(handleCreateUser)}>

                    <span className="mt-5  text-2xl font-bold flex flex-col gap-2">
                Full Name
            <input type="text" placeholder="John Doe"
                // value={formUser.name}
                   className=" w-min h-10"
                // onChange={(e) => {
                //     setUserForm({...formUser, name: e.target.value});
                // }}
                   {...registerUser("name")}
            />
                        {userErrors.name && <p className=" text-sm text-red-600">{userErrors.name.message}</p>}
                </span>
                        <span className="mt-5 text-2xl font-bold flex flex-col gap-2">
                User Name
            <input type="text" placeholder="John12"
                // value={formUser.username}
                   className=" w-min h-10 "
                // onChange={(e) => {
                //     setUserForm({...formUser, username: e.target.value});
                // }}
                   {...registerUser("username")}

            />
                            {userErrors.username && <p className=" text-sm text-red-600">{userErrors.username.message}</p>}
                </span>
                        <span className="mt-5 text-2xl font-bold flex flex-col gap-1">
                Mail
                        <input type="email" placeholder="john@mail.com"

                            // value={formUser.email}
                               className=" w-min h-10 mb-4"
                            // onChange={(e) => {
                            //     setUserForm({...formUser, email: e.target.value});
                            // }}
                               {...registerUser("email")}

                        />
                            {userErrors.email && <p className="mb-10 text-sm text-red-600">{userErrors.email.message}</p>}

                </span>
                        <button
                            type="submit"
                            // onClick={handleCreateUser}
                            className=" cursor-pointer hover:bg-green-900 px-3 py-2 bg-green-600 text-white rounded"
                            disabled={userSubmitting || createUser.isPending}

                        >
                            {userSubmitting || createUser.isPending ? "Adding..." : "Add User"}
                        </button>
                    </form>

                </div>
            </div>
            {/*Post List*/}
            <h1 className="mt-10  mb-1 text-3xl ">Posts</h1>
            <hr className="mb-5"/>
            <div className=" justify-start lg:mb-10  flex gap-10">
                <button className="w-30 max-h-10  hover:bg-stone-400 cursor-pointer bg-white rounded-2xl p-2 text-black"
                        onClick={() => page > 1 ? setPage(page - 1) : null}>
                    Previous Page
                </button>
                <button className="w-30 max-h-10  hover:bg-stone-400 cursor-pointer bg-white rounded-2xl p-2 text-black"
                        onClick={() => {
                            setPage(page + 1);
                        }}>
                    Next Page
                </button>
                <span className="p-2">Current page : {page}</span>
            </div>


            {postsLoading && <div>Loading...</div>}
            {postsLoading ? (
                <div>Loading...</div>
            ) : (
                <>

                    <div className="hidden lg:block">
                        <PostTable
                            posts={posts}
                            onEdit={openEditPost}
                            onDelete={handlePostDelete}
                            isDeletingId={deletingId}
                        />
                    </div>
                    <div className="block lg:hidden">
                        <ul>
                            {posts?.map((post) => (
                                <PostCard key={post.id}
                                          post={post}
                                          onEdit={openEditPost}
                                          onDelete={handlePostDelete}
                                          isDeletingId={deletingId}

                                />


                            ))}
                        </ul>
                    </div>
                </>
            )}

            <PostEditDialog
                open={isPostEditOpen}
                onOpenChange={(o) => {
                    setIsPostEditOpen(o);
                    if (!o) setEditingPost(null);
                }}
                post={editingPost}
                onSave={handlePostSaveEdit}
                saving={update.isPending}
            />
            <UserEditDialog
                open={isUserEditOpen}
                onOpenChange={(o) => {
                    setIsUserEditOpen(o);
                    if (!o) setEditingUser(null);
                }}
                user={editingUser}
                onSave={handleUserSaveEdit}
                saving={update.isPending}
            />

            {/*----------------Users Section ------------------*/}
            <section className="mt-20 mb-20" id="users">
                <h1 className="text-3xl flex mb-2 ">User List
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-8 align-middle  mx-5">
                        <path
                            d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/>
                    </svg>
                </h1>
                <hr className="mb-5"/>
                {usersLoading && <div>Users Loading...</div>}
                {usersError && <div>Error: {(usersError).message}</div>}
                <UserTable
                    users={users}
                    onEdit={openEditUser}
                    onDelete={handleUserDelete}
                    isDeletingId={deletingId}
                />

            </section>
        </div>
    )
}

