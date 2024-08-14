import { CreateMealBody, UpdateMealBody } from "./meals.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { createMealRepository, updateMealRepository } from "./meals.repository";

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
  try {
    await updateMealRepository(id, req.body);
    return reply.code(201).send();
  } catch (err) {
    return reply.code(400).send(err);
  }
}
