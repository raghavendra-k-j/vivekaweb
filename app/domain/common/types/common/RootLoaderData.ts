import type { AppEnvJson } from "~/core/config/AppEnv";
import type { OrgConfigJson } from "~/domain/common/models/OrgConfig";

export type RootLoaderData = {
    orgConfig: OrgConfigJson;
    appEnv: AppEnvJson;
}