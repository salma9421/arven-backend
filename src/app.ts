import express from "express";
import pinoHttp from "pino-http";
import { logger } from "./utils/logger";

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "arven-backend",
  });
});

export default app;
