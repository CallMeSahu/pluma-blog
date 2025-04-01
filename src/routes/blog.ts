import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';

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

    c.set('userId', payload.id as string);
    await next();
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

        const existingBlogs = await prisma.blog.findMany({});

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
            where: { id }
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