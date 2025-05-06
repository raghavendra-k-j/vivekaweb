import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

export type BaseEnvProps = {
    tenant?: string;
    apiSchema: string;
    apiHost: string;
    apiPort: string;
}

export class BaseEnv {

    readonly tenant?: string;
    readonly apiSchema: string;
    readonly apiHost: string;
    readonly apiPort: string;

    private static _instance: BaseEnv | null = null;

    private constructor(props: BaseEnvProps) {
        this.tenant = props.tenant;
        this.apiSchema = props.apiSchema;
        this.apiHost = props.apiHost;
        this.apiPort = props.apiPort;
    }

    get apiBase(): string {
        return `${this.apiSchema}://${this.apiHost}:${this.apiPort}`;
    }

    static async loadEnv(): Promise<void> {
        const envPath = path.resolve(process.cwd(), 'env.json');
        if (!fs.existsSync(envPath)) {
            throw new Error(`Environment file not found at ${envPath}`);
        }

        const envData = await fs.promises.readFile(envPath, 'utf-8');
        const envJson = JSON.parse(envData);

        if (!envJson) {
            throw new Error('Failed to parse environment file');
        }

        logger.debug('BaseEnv',"Loaded Successfully" , envJson);

        BaseEnv._instance = new BaseEnv(envJson);
    }

    static get instance(): BaseEnv {
        if(!BaseEnv._instance) {
            throw new Error('BaseEnv not initialized. Call loadEnv() first.');
        }
        return BaseEnv._instance!;
    }
}