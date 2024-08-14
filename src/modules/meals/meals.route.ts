import { FastifyInstance, RouteOptions } from "fastify";
import {
  createMealController,
  deleteMealController,
  getMealController,
  getUserMealsController,
  updateMealController,
} from "./meals.controller";
import { addTagInRoute } from "../../middlewares/add-tag-in-route";

export async function mealsRoute(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.addHook("onRoute", addTagInRoute("Meals"));

  app.post("/", createMealController);
  app.put("/:id", updateMealController);
  app.delete("/:id", deleteMealController);
  app.get("/", getUserMealsController);
  app.get("/:id", getMealController);
}
