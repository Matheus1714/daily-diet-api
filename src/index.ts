import { app } from "./app";
import { env } from "./env";

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.info(`HTTP Server Running on port ${env.PORT}`);
  });

app.swagger;
