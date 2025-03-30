import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const route = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

route.get("/", c => {
    return c.text("User Route");
});

route.post("/signup", c => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    return c.text("Signup Route");
});

route.post("/signin", c => {
    return c.text("Signin Route");
});

export { route as userRoute };