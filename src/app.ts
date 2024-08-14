import fastify, {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { usersRoutes } from "./modules/users/users.route";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import { env } from "./env";
import { verifyAuthenticatedUser } from "./middlewares/verify-authenticated-user";
import { logFormatedRequest } from "./middlewares/log-formeted-request";

export const app = fastify();

// Plugins
app.register(fjwt, { secret: env.AUTH_SECRET });
app.register(fCookie, {
  secret: env.COOKIE_SECRET,
  hook: "preHandler",
});

// Hooks
app.addHook("preHandler", logFormatedRequest);
app.addHook(
  "preHandler",
  (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    req.jwt = app.jwt;
    done();
  }
);

// Decoratorss
app.decorate("authenticate", verifyAuthenticatedUser);

// Routes
app.register(usersRoutes, { prefix: "users" });
