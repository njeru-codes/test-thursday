const { createLogger, transports, format } = require("winston");

const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, meta }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message} ${meta ? JSON.stringify(meta, null, 2) : ""}`;
    })
);

const logger = createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/app.log" }) 
    ]
});

const requestLogger = (req, res, next) => {
    const startTime = Date.now();

    console.log(req.ip)
    logger.info("Incoming Request", {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        headers: req.headers,
        body: req.body,
        query: req.query
    });
    
    

    // Capture response details when finished
    res.on("finish", () => {
        const duration = Date.now() - startTime;
        logger.info("Response Sent", {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            url: req.originalUrl,
            method: req.method,
            responseTime: `${duration}ms`
        });
    });

    next();
};

module.exports = { logger, requestLogger };
