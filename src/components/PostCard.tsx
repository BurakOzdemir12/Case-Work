import React from 'react'
import type {Post} from "@/types/Post.ts";

interface Props  {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
    isDeletingId?: number | null;


}

const PostCard = React.memo(function PostCard({post, onEdit, onDelete, isDeletingId}: Props) {

    return (
        <div className="relative   gap-4">

            <li className="mt-10 rounded-lg border p-4 shadow-sm">
                <h4 className="text-sm text-muted-foreground">User {post.userId}</h4>
                <h2 className="font-bold text-2xl">{post.title}</h2>
                <p className="">{post.body}</p>

                <div className="mt-5 flex gap-2">
                    <button
                        onClick={() => {
                            onEdit(post)
                        }}
                        className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => {
                            onDelete(post.id)
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-60"
                        disabled={isDeletingId === post.id}
                    >
                        {isDeletingId === post.id ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </li>
        </div>

    );
});

export default PostCard
