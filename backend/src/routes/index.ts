import { Hono } from "hono";
import { userRoute } from "./user";
import { blogRoute } from "./blog";

const rootRouter = new Hono();

rootRouter.route("/user", userRoute);
rootRouter.route("/blog", blogRoute);

export { rootRouter };