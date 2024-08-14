import fastify, { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { knex } from "./database";
import { usersRoutes } from "./modules/users/users.route";

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

app.register(usersRoutes, { prefix: "users" });
