import React from 'react'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import type {User} from "@/types/User.ts";

interface Props {
    users?: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
    isDeletingId?: number | null;
}

const UserTable = React.memo(function UserCard({users, onEdit, onDelete, isDeletingId}: Props) {
    if (!users?.length) {
        return <div className="text-sm text-muted-foreground">No User Founded.</div>
    }
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px] text-white">ID</TableHead>
                        <TableHead className="w-[60px] text-white">Full Name</TableHead>
                        <TableHead className="text-white">User Name</TableHead>
                        <TableHead className="text-white">Email</TableHead>
                        <TableHead className="text-center text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell className="font-medium ">{u.id}</TableCell>
                            <TableCell className="font-medium">{u.name}</TableCell>
                            <TableCell>{u.username}</TableCell>
                            <TableCell className="max-w-[500px] truncate">{u.email}</TableCell>
                            <TableCell className="text-center space-x-2">
                                <button
                                    className=" cursor-pointer px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => {
                                        onEdit(u)
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="cursor-pointer px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                                    onClick={() => {
                                        onDelete(u.id)
                                    }}
                                    disabled={isDeletingId === u.id}
                                >
                                    {isDeletingId === u.id ? "Deleting..." : "Delete"}
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
});
export default UserTable
