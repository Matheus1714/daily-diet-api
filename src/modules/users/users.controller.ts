import { CreateUserBody, SignInUserBody } from "./users.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { createUserRepository, findUserByEmail } from "./users.repository";
import bcrypt from "bcrypt";
import { env } from "../../env";

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

export async function signInUserController(
  req: FastifyRequest<{ Body: SignInUserBody }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  const isMatch = user && (await bcrypt.compare(password, user.hash));

  if (!user || !isMatch) {
    reply.status(401).send({
      message: "Invalid email or password",
    });
  }

  const payload = {
    id: user?.code,
    email: user?.email,
    name: user?.name,
  };

  const token = req.jwt.sign(payload);

  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
  });

  return { accessToken: token };
}

export async function signOutUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie("access_token");
}

export async function getUserInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  reply.status(200).send({
    user: req.user,
  });
}
