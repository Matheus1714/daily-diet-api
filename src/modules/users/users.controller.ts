import { CreateUserBody } from "./users.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { createUserRepository, findUserByEmail } from "./users.repository";

export async function createUserController(
  req: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply
) {
  const { password, email, name } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    return reply.code(401).send({
      message: "User already exists with this email",
    });
  }

  try {
    await createUserRepository({ name, email, password });
    return reply.code(201).send(user);
  } catch (err) {
    return reply.code(400).send(err);
  }
}
