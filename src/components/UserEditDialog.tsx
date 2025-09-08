import  {useEffect} from "react";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {UserFormSchema, type UserFormValues} from "@/validation/schemas";
import {DialogClose} from "@radix-ui/react-dialog";

interface UpdateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: { name?: string; username?: string; email?: string } | null; // <-- düzeltildi
    onSave: (data: { name: string; username: string; email: string }) => void;
    saving: boolean;
}

const UserEditDialog = ({open, onOpenChange, user, onSave, saving}: UpdateDialogProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<UserFormValues>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {
            name: user?.name ?? "",
            username: user?.username ?? "",
            email: user?.email ?? "",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        reset({
            name: user?.name ?? "",
            username: user?.username ?? "",
            email: user?.email ?? "",
        });
    }, [user, open, reset]);

    const onSubmit = (data: UserFormValues) => onSave(data);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-stone-950 sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription className="mb-3">
                            Make changes to your user here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" {...register("name")}
                                   className={errors.name ? "border-red-800" : "border-gray-300"}/>
                            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="username">User Name</Label>
                            <Input id="username" placeholder="john12" {...register("username")}
                                   className={errors.username ? "border-red-800" : "border-gray-300"}
                            />
                            {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@mail.com" {...register("email")} />
                            className={errors.email ? "border-red-800" : "border-gray-300"}
                            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                        </div>
                    </div>

                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button variant="secondary" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="secondary" className="cursor-pointer"
                                disabled={saving || isSubmitting}>
                            {saving || isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserEditDialog;
