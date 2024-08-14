import { FastifyInstance } from "fastify";
import {
  createMealController,
  deleteMealController,
  getMealController,
  getUserMealsController,
  updateMealController,
} from "./meals.controller";

export async function mealsRoute(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.post("/", createMealController);
  app.put("/:id", updateMealController);
  app.delete("/:id", deleteMealController);
  app.get("/", getUserMealsController);
  app.get("/:id", getMealController);
}
