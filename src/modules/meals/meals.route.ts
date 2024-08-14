import { FastifyInstance } from "fastify";
import { createMealController, updateMealController } from "./meals.controller";

export async function mealsRoute(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.post("/", createMealController);
  app.put("/:id", updateMealController);
}
