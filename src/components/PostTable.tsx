import React from "react"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import type {Post} from "@/types/Post"

interface Props {
    posts?: Post[];
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
    isDeletingId?: number | null;
}

const PostTable = React.memo(function PostTable({posts, onEdit, onDelete, isDeletingId}: Props) {
    if (!posts?.length) {
        return <div className="text-sm text-muted-foreground">No Post Founded.</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[60px] text-white">ID</TableHead>
                    <TableHead className="w-[60px] text-white">User</TableHead>
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">Body</TableHead>
                    <TableHead className="text-center text-white">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {posts.map((p) => (
                    <TableRow key={p.id}>
                        <TableCell className="font-medium ">{p.id}</TableCell>
                        <TableCell className="font-medium">{p.userId}</TableCell>
                        <TableCell>{p.title}</TableCell>
                        <TableCell className="max-w-[500px] truncate">{p.body}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <button
                                className=" cursor-pointer px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => {
                                    onEdit(p)
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="cursor-pointer px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                                onClick={() => {
                                    onDelete(p.id)
                                }}
                                disabled={isDeletingId === p.id}
                            >
                                {isDeletingId === p.id ? "Deleting..." : "Delete"}
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
});

export default PostTable
