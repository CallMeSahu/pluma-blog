import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "@callmesahu/pluma-blog-common";

const route = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

route.get("/", c => {
    return c.text("User Route");
});

route.post("/signup", async c => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const { email, name, password } = await c.req.json();
        const { success } = signupSchema.safeParse({ email, name, password });
        if(!success){
            c.status(400);
            return c.json({ error: "Invalid data" });
        };

        const user = await prisma.user.findUnique({
            where: { email }
        });
        if(user){
            c.status(409);
            return c.json({ error: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await prisma.user.create({
            data: { email, name, password: hashedPassword }
        });
        const token = await sign({ id: createdUser.id }, c.env.JWT_SECRET);

        c.status(201);
        return c.json({ token, name: createdUser.name });
    } catch (error) {
        console.error(error);
        return c.text("Error signing up", 500);        
    }
});

route.post("/signin", async c => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const { email, password } = await c.req.json();
        const { success } = signinSchema.safeParse({ email, password });
        if(!success){
            c.status(400);
            return c.json({ error: "Invalid data" });
        };
        const user = await prisma.user.findUnique({
            where: { email }
        });

        const verifyPassword = await bcrypt.compare(password, user?.password || "");
        if(!user || !verifyPassword){
            c.status(401);
            return c.json({ error: "Invalid credentials" });
        }    
        const token = await sign({ id: user.id, name: user.name }, c.env.JWT_SECRET);

        c.status(200);
        return c.json({ token, name: user.name });
    } catch (error) {
        console.error(error);
        return c.text("Error signing in", 500);                
    }
});

export { route as userRoute };