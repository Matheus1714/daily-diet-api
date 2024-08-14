import { FastifyJWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyAuthenticatedUser(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const token = req.cookies.access_token;

  if (!token) {
    return reply.status(401).send({ message: "Authentication required" });
  } else {
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    req.user = decoded;
  }
}
