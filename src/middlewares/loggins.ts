import { createLogger, transports, format } from "winston";

export const logger = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(({ timestamp, level, message, metadata }) => {
            return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
              metadata
            )}`;
          })
        ),
      }),
      new transports.File({
        dirname: "logs",
        filename: "falp_logs.log",
        format: format.combine(format.json()),
      }),
    ],
    format: format.combine(format.metadata(), format.timestamp()),
  });
  