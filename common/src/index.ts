import zod from "zod";

export const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string().optional()
});
export type SignupSchema = zod.infer<typeof signupSchema>;

export const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});
export type SigninSchema = zod.infer<typeof signinSchema>;

export const createBlogSchema = zod.object({
    title: zod.string().min(1),
    content: zod.string().min(1),
});
export type CreateBlogSchema = zod.infer<typeof createBlogSchema>;

export const updateBlogSchema = zod.object({
    id: zod.string().uuid(),
    title: zod.string().min(1).optional(),
    content: zod.string().min(1).optional(),
    published: zod.boolean().optional(),
});
export type UpdateBlogSchema = zod.infer<typeof updateBlogSchema>;