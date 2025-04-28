import chalk from 'chalk';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {

    private static instance: Logger;
    private logLevel: LogLevel = 'debug';

    private constructor() { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    // Generic log method to handle multiple arguments
    private log(level: LogLevel, ...args: any[]): void {
        if (this.shouldLog(level)) {
            const message = this.formatMessage(level, ...args);
            this.printLog(level, message);
        }
    }

    // Formats the log message with colors and handles multiple arguments
    private formatMessage(level: LogLevel, ...args: any[]): string {
        const formattedArgs = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);  // Pretty print objects
            }
            return String(arg);  // Convert to string
        }).join(' ');

        return `[${level.toUpperCase()}] ${formattedArgs}`;
    }

    // Optimized printLog method using a map for log level to color/style mapping
    private printLog(level: LogLevel, message: string): void {
        const logStyles: Record<LogLevel, (message: string) => string> = {
            info: chalk.blue,
            warn: chalk.yellow,
            error: chalk.red,
            debug: chalk.gray
        };

        const logStyle = logStyles[level] || chalk.white;  // Default to white if level is not found
        console.log(logStyle(message));  // Apply the style and log the message
    }

    // Public methods to log different levels
    public info(...args: any[]): void {
        this.log('info', ...args);
    }

    public warn(...args: any[]): void {
        this.log('warn', ...args);
    }

    public error(...args: any[]): void {
        this.log('error', ...args);
    }

    public debug(...args: any[]): void {
        this.log('debug', ...args);
    }

    // Determines if a log should be printed based on the current log level
    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['info', 'warn', 'error', 'debug'];
        return levels.indexOf(level) <= levels.indexOf(this.logLevel);
    }
}

const logger = Logger.getInstance();

export { Logger, logger };
