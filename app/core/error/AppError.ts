type AppErrorProps = {
    message: string;
    description?: string;
}

export class AppError extends Error {

    message: string;
    description?: string;

    constructor(props: AppErrorProps) {
        super(props.message);
        this.message = props.message;
        this.description = props.description;
    }

    static fromAny(error: any): AppError {
        if (error instanceof AppError) return error;
        if (error instanceof Error) return AppError.fromError(error);
        return AppError.unknow();
    }

    static unknow(): AppError {
        return new AppError({
            message: "Unknown error",
        });
    }

    static fromError(error: Error): AppError {
        return new AppError({
            message: error.message,
        });
    }



}