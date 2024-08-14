import fastify, {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { usersRoutes } from "./modules/users/users.route";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import { env } from "./env";

export const app = fastify();

app.addHook(
  "preHandler",
  (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    console.info(
      JSON.stringify(
        {
          method: req.method,
          path: req.url,
          query: req.query,
          params: req.params,
        },
        null,
        2
      )
    );
    done();
  }
);

app.register(fjwt, { secret: env.AUTH_SECRET });

app.addHook(
  "preHandler",
  (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    req.jwt = app.jwt;
    done();
  }
);

app.register(fCookie, {
  secret: env.COOKIE_SECRET,
  hook: "preHandler",
});

app.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;

    if (!token) {
      return reply.status(401).send({ message: "Authentication required" });
    } else {
      const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
      req.user = decoded;
    }
  }
);

app.register(usersRoutes, { prefix: "users" });
