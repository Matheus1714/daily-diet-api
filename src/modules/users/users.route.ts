import { FastifyInstance } from "fastify";
import {
  createUserController,
  signInUserController,
  signOutUserController,
  getUserInfoController,
} from "./users.controller";
import { addTagInRoute } from "../../middlewares/add-tag-in-route";

export async function usersRoutes(app: FastifyInstance) {
  app.addHook("onRoute", addTagInRoute("Users"));

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
