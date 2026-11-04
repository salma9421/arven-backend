import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    service: "arven-backend",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
