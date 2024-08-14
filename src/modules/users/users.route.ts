import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
} from "fastify";
import {
  createUserSchema,
  signinResponseSchema,
  signInSchema,
} from "./users.schema";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = createUserSchema.parse(req.body);
      reply.status(201).send();
    } catch (error) {
      reply.status(400).send({ error: error });
    }
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

  app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "teste" });
  });

  app.delete("/signout", () => {});
}
