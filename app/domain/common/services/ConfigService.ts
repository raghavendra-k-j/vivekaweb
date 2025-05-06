import type { AppError } from "~/core/error/AppError";
import type { ResEither } from "~/core/utils/ResEither";
import { ConfigRepo } from "~/infra/repos/ConfigRepo";
import type { OrgConfig } from "../models/OrgConfig";
import { BaseApiClient } from "~/infra/datasources/BaseApiClient";


export class ConfigService {

    private repo: ConfigRepo;

    constructor({ apiClient }: { apiClient: BaseApiClient }) {
        this.repo = new ConfigRepo({ apiClient });
    }

    public async getOrgConfig(subdomain: string): Promise<ResEither<AppError, OrgConfig>> {
        return await this.repo.getOrgConfig(subdomain);
    }
}

let _configService: ConfigService | undefined = undefined;

export const createConfigService = (apiClient: BaseApiClient) => {
    _configService = new ConfigService({ apiClient });
}

export const getConfigService = (): ConfigService => {
    if (!_configService) {
        throw new Error("ConfigService not initialized. Call createConfigService() first.");
    }
    return _configService;
};
