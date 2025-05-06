import type { AppEnv } from "~/core/config/AppEnv";
import { logger } from "~/core/utils/logger";
import type { OrgConfig } from "~/domain/common/models/OrgConfig";

export class AppStore {
    appEnv: AppEnv;
    orgConfig: OrgConfig;

    constructor({ appEnv, orgConfig }: { appEnv: AppEnv, orgConfig: OrgConfig }) {
        this.appEnv = appEnv;
        this.orgConfig = orgConfig;
        logger.debug("AppStore initialized");
    }
}