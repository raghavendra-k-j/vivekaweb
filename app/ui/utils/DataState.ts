import type { AppError } from "~/core/error/AppError";

export enum DataStateState {
    INIT = 'INIT',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR',
}

export class DataState<Data> {
    private constructor(
        private readonly state: DataStateState,
        private readonly dataValue: Data | null = null,
        private readonly errorValue: AppError | null = null
    ) { }

    static init<Data>(): DataState<Data> {
        return new DataState<Data>(DataStateState.INIT);
    }

    static loading<Data>(): DataState<Data> {
        return new DataState<Data>(DataStateState.LOADING);
    }

    static data<Data>(data: Data): DataState<Data> {
        return new DataState<Data>(DataStateState.LOADED, data);
    }

    static error<Data>(error: AppError): DataState<Data> {
        return new DataState<Data>(DataStateState.ERROR, null, error);
    }

    get isInit(): boolean {
        return this.state === DataStateState.INIT;
    }

    get isLoading(): boolean {
        return this.state === DataStateState.LOADING;
    }

    get isLoaded(): boolean {
        return this.state === DataStateState.LOADED;
    }

    get isError(): boolean {
        return this.state === DataStateState.ERROR;
    }

    get data(): Data | null {
        return this.dataValue;
    }

    get error(): AppError | null {
        return this.errorValue;
    }

    when<T>(handlers: {
        init: () => T;
        loading: () => T;
        loaded: (data: Data) => T;
        error: (error: AppError) => T;
    }): T {
        switch (this.state) {
            case DataStateState.INIT:
                return handlers.init();
            case DataStateState.LOADING:
                return handlers.loading();
            case DataStateState.LOADED:
                return handlers.loaded(this.dataValue as Data);
            case DataStateState.ERROR:
                return handlers.error(this.errorValue as AppError);
            default:
                throw new Error('Unhandled state in DataState.when()');
        }
    }
}
