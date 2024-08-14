import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  createUserSchema,
  signinResponseSchema,
  signInSchema,
} from "./users.schema";
import { createUserController } from "./users.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", createUserController);

  app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "teste" });
  });

  //   app.post(
  //     "/signin",
  //     {
  //       schema: {
  //         body: signInSchema,
  //         response: {
  //           200: signinResponseSchema,
  //         },
  //       },
  //     },
  //     (req: FastifyRequest, reply: FastifyReply) => {
  //       reply.send({ accessToken: "test" });
  //     }
  //   );

  app.delete("/signout", () => {});
}
