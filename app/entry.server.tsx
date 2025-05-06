import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { BaseEnv } from "./core/config/BaseEnv";
import { BaseApiClient } from "./infra/datasources/BaseApiClient";
import { createConfigService } from "./domain/common/services/ConfigService";
import { logger } from "./core/utils/logger";
import { ApiClient } from "./infra/datasources/ApiClient";
import { createFormService } from "./domain/forms/services/FormsService";
import { FormRepo } from "./infra/repos/FormRepo";

export const streamTimeout = 5_000;

await BaseEnv.loadEnv();
BaseApiClient.createInstace({ baseURL: BaseEnv.instance.apiBase });
createConfigService(BaseApiClient.findInstance());

ApiClient.createInstace({ baseURL: BaseEnv.instance.apiBase })
createFormService(new FormRepo({ apiClient: ApiClient.findInstance() }));

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );
    setTimeout(abort, streamTimeout + 1000);
  });
}
