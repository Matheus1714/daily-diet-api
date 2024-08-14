import { CreateMealBody, UpdateMealBody } from "./meals.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  createMealRepository,
  deleteMealRepository,
  getMealRepository,
  getUserMealsRepository,
  updateMealRepository,
} from "./meals.repository";
import { findUserByCode } from "../users/users.repository";

export async function createMealController(
  req: FastifyRequest<{ Body: CreateMealBody }>,
  reply: FastifyReply
) {
  const { name, description, date, diet } = req.body;
  const { id } = req.user;

  try {
    await createMealRepository({ name, description, date, diet }, id);
    return reply.code(201).send();
  } catch (err) {
    return reply.code(400).send(err);
  }
}

export async function updateMealController(
  req: FastifyRequest<{ Body: UpdateMealBody; Params: { id: number } }>,
  reply: FastifyReply
) {
  const id = req.params.id;
  const meal = await getMealRepository(id);

  if (meal.user_id !== req.user.id) {
    return reply.code(401).send({ err: "Unauthorized access" });
  }

  try {
    await updateMealRepository(id, req.body);
    return reply.code(200).send();
  } catch (err) {
    return reply.code(400).send(err);
  }
}

export async function deleteMealController(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const id = req.params.id;
  const meal = await getMealRepository(id);

  if (meal.user_id !== req.user.id) {
    return reply.code(401).send({ err: "Unauthorized access" });
  }

  try {
    await deleteMealRepository(id);
    return reply.code(200).send();
  } catch (err) {
    return reply.code(400).send(err);
  }
}

export async function getUserMealsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const meals = await getUserMealsRepository(req.user.id);
    return reply.code(200).send({ meals });
  } catch (err) {
    return reply.code(400).send(err);
  }
}

export async function getMealController(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  try {
    const meal = await getMealRepository(req.params.id);

    if (meal.user_id !== req.user.id) {
      return reply.code(401).send({ err: "Unauthorized access" });
    }

    return reply.code(200).send({ ...meal });
  } catch (err) {
    return reply.code(400).send(err);
  }
}
