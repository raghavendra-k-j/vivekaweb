import { useMemo } from "react";
import { AppContext } from "./AppContext";
import { AppStore } from "./AppStore";
import type { AppEnv } from "~/core/config/AppEnv";
import type { OrgConfig } from "~/domain/common/models/OrgConfig";


export function AppProvider({ children, appEnv, orgConfig }: { children: React.ReactNode, appEnv: AppEnv, orgConfig: OrgConfig }) {
    const appStore = useMemo(() => new AppStore({ appEnv, orgConfig }), [appEnv, orgConfig]);
    return (
        <AppContext.Provider value={appStore}>
            {children}
        </AppContext.Provider>
    );
}