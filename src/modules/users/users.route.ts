import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  createUserController,
  signInUserController,
  signOutUserController,
  getUserInfoController,
} from "./users.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", createUserController);

  app.post("/signin", signInUserController);

  app.delete(
    "/signout",
    {
      preHandler: [app.authenticate],
    },
    signOutUserController
  );

  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    getUserInfoController
  );
}
