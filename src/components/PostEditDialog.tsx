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
import {PostFormSchema, type PostFormValues} from "@/validation/schemas";
import {DialogClose} from "@radix-ui/react-dialog";

interface UpdateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post?: { title?: string; body?: string } | null;
    onSave: (data: { title: string; body: string }) => void;
    saving: boolean;
}

const PostEditDialog = ({open, onOpenChange, post, onSave, saving}: UpdateDialogProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<PostFormValues>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            title: post?.title ?? "",
            body: post?.body ?? "",
        },
        mode: "onTouched",
    });


    useEffect(() => {
        reset({
            title: post?.title ?? "",
            body: post?.body ?? "",
        });
    }, [post, open, reset]);

    const onSubmit = (data: PostFormValues) => {
        onSave(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-stone-950 sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription className="mb-3">
                            Make changes to your post here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Post Title</Label>
                            <Input id="title" placeholder="Title" {...register("title")}
                                   className={errors.title ? "border-red-800" : "border-gray-300"}
                            />
                            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="body">Post Text</Label>
                            <Input id="body" placeholder="Body" {...register("body")}
                                   className={errors.body ? "border-red-800" : "border-gray-300"}
                            />
                            {errors.body && <p className="text-sm text-red-600">{errors.body.message}</p>}
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

export default PostEditDialog;
