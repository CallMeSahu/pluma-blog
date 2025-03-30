import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const router = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

router.get("/", c => {
    return c.text("Blog route");
});

router.post("/", c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    return c.text("Create a new blog post");
});

router.put("/", c => {
    return c.text("Update a blog post");
});

router.get("/:id", c => {
    const id = c.req.param("id");
    return c.text(`Get blog post with ID: ${id}`);
});

router.get("/bulk", c => {
    return c.text("Get multiple blog posts");
})

export { router as blogRoute };