import { Outlet, } from "react-router";
import type { Route } from "./+types/root";
import { AppEnv } from "./core/config/AppEnv";
import { BaseEnv } from "./core/config/BaseEnv";
import { getConfigService } from "./domain/common/services/ConfigService";
import type { RootLoaderData } from "./domain/common/types/common/RootLoaderData";
import { ApiError } from "./infra/errors/ApiError";


export async function loader({ request }: Route.LoaderArgs): Promise<RootLoaderData> {
  const appEnv = AppEnv.fromBaseEnv(BaseEnv.instance, request.url);
  const orgConfigRes = (await getConfigService().getOrgConfig(appEnv.tenant));
  if (orgConfigRes.isError) {
    const apiError = orgConfigRes.error;
    const statusCode = apiError instanceof ApiError ? apiError.statusCode ?? 500 : 500;
    throw new Response(JSON.stringify({
      message: apiError.message,
      description: apiError.description,
      developerMessage: apiError.developerMessage,
    }), {
      status: statusCode,
      statusText: apiError.message,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const orgConfig = orgConfigRes.data;
  return {
    appEnv: appEnv.serialize(),
    orgConfig: orgConfig.serialize(),
  };
}

export default function App(props: Route.ComponentProps) {
  return (<Outlet />);
}