import { FastifyReply, FastifyRequest } from "fastify";

export async function logFormatedRequest(
  req: FastifyRequest,
  reply: FastifyReply
) {
  console.info(
    JSON.stringify(
      {
        method: req.method,
        path: req.url,
        query: req.query,
        params: req.params,
      },
      null,
      2
    )
  );
}
