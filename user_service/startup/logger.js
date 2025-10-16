import winston from "winston";
const { combine, timestamp, printf, json } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "logfile.log", level: "info" }),
  ],
});

export default function () {
  process.on("uncaughtException", (ex) => {
    logger.error(ex.stack);
  });

  process.on("unhandledRejection", (ex) => {
    logger.error(`UNHANDLED REJECTION: ${ex.stack}`, () => {
      process.exit(1);
    });
  });
}
