import { FastifyInstance, RouteOptions } from "fastify";

export function addTagInRoute(tag: string) {
  return async (routeOptions: RouteOptions) => {
    routeOptions.schema = {
      ...(routeOptions.schema || {}),
      tags: [...(routeOptions.schema?.tags || []), tag],
    };
  };
}
