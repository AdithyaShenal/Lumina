import winston from "winston";
const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(
  ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
);

export const errorLogger = winston.createLogger({
  level: "error",
  format: combine(
    colorize(), // adds color for levels
    timestamp({ format: "HH:mm:ss" }), // short time format
    logFormat
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: combine(timestamp(), logFormat),
    }),
  ],
});

export const infoLogger = winston.createLogger({
  level: "info",
  format: combine(
    colorize(), // adds color for levels
    timestamp({ format: "HH:mm:ss" }), // short time format
    printf(
      ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
    )
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "log.log",
      level: "info",
      format: combine(timestamp(), logFormat),
    }),
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
