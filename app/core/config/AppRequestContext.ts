import type { AppLoadContext } from "react-router";
import type { AppEnv } from "./AppEnv";

export interface AppRequestContext extends AppLoadContext {
    env: AppEnv;
}