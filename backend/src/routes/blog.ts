import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogSchema, updateBlogSchema } from "@callmesahu/pluma-blog-common";

const router = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

router.use("/*", async (c, next) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const token = c.req.header("Authorization")?.split(" ")[1];
        if(!token){
            c.status(401);
            return c.text("Unauthorized");
        }
    
        const payload = await verify(token, c.env.JWT_SECRET);
        if(!payload){
            c.status(401);
            return c.text("Unauthorized");
        }
    
        const existingUser = await prisma.user.findUnique({
            where: { id: payload.id as string }
        })    
        if(!existingUser){
            c.status(401);
            return c.text("Unauthorized");
        }
    
        c.set('userId', existingUser.id);
        await next();
    } catch (error) {
        c.status(401);
        return c.json({ error: "Unauthorized" });        
    }
});

router.get("/", c => {
    const userId = c.get('userId');
    return c.json({ message: "Blog Route", userId });
});

router.post("/", async c => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const { title, content } = await c.req.json();
        const userId = c.get('userId');

        const { success } = createBlogSchema.safeParse({ title, content });
        if(!success){
            c.status(400);
            return c.json({ error: "Invalid data" });
        };
        const createdBlog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: userId
            }
        });

        c.status(201);
        return c.json({ id: createdBlog.id });
    } catch (error) {
        c.status(500)
        return c.json({ error: "Error creating blog post" });       
    }
});

router.put("/", async c => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const { id, title, content, published } = await c.req.json();
        const userId = c.get('userId');

        const { success } = updateBlogSchema.safeParse({ id, title, content, published });
        if(!success){
            c.status(400);
            return c.json({ error: "Invalid data" });
        };
        const updatedBlog = await prisma.blog.update({
            where: { id, authorId: userId }, 
            data:{
                title,
                content,
                published
            }
        });

        if(!updatedBlog){
            c.status(404);
            return c.json({ error: "Blog post not found" });
        }

        c.status(200);
        return c.json({ id: updatedBlog.id });
    } catch (error) {
        c.status(500)
        return c.json({ error: "Error updating blog post" });
    }
});

router.get("/bulk", async c => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const existingBlogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                publishDate: true,
                author:{
                    select: {
                        name: true,
                    }
                }
            }
        });

        c.status(200);
        return c.json(existingBlogs);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error fetching blog posts" });
    }
});

router.get("/:id", async c => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const id = c.req.param("id");
        const existingBlog = await prisma.blog.findUnique({
            where: { id },
            select: {
                title: true,
                content: true,
                publishDate: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        if(!existingBlog){
            c.status(404);
            return c.json({ error: "Blog post not found" });
        }
        
        c.status(200);
        return c.json(existingBlog);
    } catch (error) {
        c.status(500)
        return c.json({ error: "Error fetching blog post" });        
    }
});

export { router as blogRoute };