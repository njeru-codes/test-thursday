const { createLogger, transports, format } = require("winston");

const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, meta }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message} ${meta ? JSON.stringify(meta) : ""}`;
    })
);

const logger = createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new transports.Console(), // Logs to console
        // new transports.File({ filename: "logs/app.log" }) // Logs to a file
    ]
});
const requestLogger = (req, res, next) => {
    logger.info(`Incoming Request`, {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    });

    res.on("finish", () => {
        logger.info(`Response Sent`, {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            url: req.originalUrl,
            method: req.method
        });
    });

    next();
};


module.exports = { logger, requestLogger };