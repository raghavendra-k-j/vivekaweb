import chalk from 'chalk';

export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug'
}

const LOG_LEVEL_ORDER: LogLevel[] = [
    LogLevel.ERROR,
    LogLevel.WARN,
    LogLevel.INFO,
    LogLevel.DEBUG
];

class Logger {
    private static instance: Logger;
    private logLevel: LogLevel = LogLevel.DEBUG;
    private readonly instanceId: string;

    // Private constructor enforces Singleton
    public constructor(instanceId?: string) {
        this.instanceId = instanceId ?? '';
    }

    public static getInstance(instanceId?: string): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(instanceId);
        }
        return Logger.instance;
    }

    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    private shouldLog(level: LogLevel): boolean {
        return (
            LOG_LEVEL_ORDER.indexOf(level) <= LOG_LEVEL_ORDER.indexOf(this.logLevel)
        );
    }

    private formatMessage(level: LogLevel, ...args: unknown[]): string {
        let formatMessage = '';
        if (args.length > 0) {
            for (const arg of args) {
                if (typeof arg === 'string') {
                    formatMessage += `${arg} `;
                }
                else {
                    formatMessage += `${arg}`;
                }
            }
        }
        return `[${this.instanceId}] [${level.toUpperCase()}] ${formatMessage}`;
    }

    private printLog(level: LogLevel, message: string): void {
        const logStyles: Record<LogLevel, (msg: string) => string> = {
            [LogLevel.INFO]: chalk.blue,
            [LogLevel.WARN]: chalk.yellow,
            [LogLevel.ERROR]: chalk.red,
            [LogLevel.DEBUG]: chalk.gray
        };

        console.log(logStyles[level](message));
    }

    private log(level: LogLevel, ...args: unknown[]): void {
        if (this.shouldLog(level)) {
            const message = this.formatMessage(level, ...args);
            this.printLog(level, message);
        }
    }

    public info(...args: unknown[]): void {
        this.log(LogLevel.INFO, ...args);
    }

    public warn(...args: unknown[]): void {
        this.log(LogLevel.WARN, ...args);
    }

    public error(...args: unknown[]): void {
        this.log(LogLevel.ERROR, ...args);
    }

    public debug(...args: unknown[]): void {
        this.log(LogLevel.DEBUG, ...args);
    }
}

const logger = Logger.getInstance();

export { Logger, logger };
