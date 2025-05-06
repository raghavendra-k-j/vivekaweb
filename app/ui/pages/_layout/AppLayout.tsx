import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData } from "react-router";
import "~/ds/core/core.css";
import type { Route } from "./+types/AppLayout";
import { AppEnv } from "~/core/config/AppEnv";
import { AppRoutes } from "~/routes/AppRoutes";
import { AppProvider } from "./AppProvider";
import { OrgConfig } from "~/domain/common/models/OrgConfig";
import { useMemo } from "react";
import type { RootLoaderData } from "~/domain/common/types/common/RootLoaderData";


export function links() {
    return [
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
    ];
}


export default function AppLayout(props: Route.ComponentProps) {
    const data = useRouteLoaderData(AppRoutes.rootId) as RootLoaderData;

    const { appEnv, orgConfig } = useMemo(() => {
        return {
            appEnv: AppEnv.deserialize(data.appEnv),
            orgConfig: OrgConfig.deserialize(data.orgConfig),
        };
    }, [data]);

    return (
        <Document>
            <AppProvider appEnv={appEnv} orgConfig={orgConfig}>
                <Outlet />
            </AppProvider>
        </Document>
    );
}


function Document({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
