import { auth } from "@/lib/auth";
import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import SessionMiddleware from "./middlewares/session.middleware";
import { Context } from "./utils/context";


const app = new Hono<Context>().basePath("/api")

app.use(logger());
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
  "*",
  cors({
    origin: (origin, _) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return origin || "*";
      }
      return undefined;
    },
    allowHeaders: ["Content-Type", "Authorization", "x-razorpay-signature"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);
app.use("*", SessionMiddleware)

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/hello", (c) => {
  return c.text("Hello From Hono!");
});

// ROUTES
import userRouter from "./src/routes/userRoute";

const routes = app.route("/user", userRouter)
export type AppType = typeof routes;
export default app;
