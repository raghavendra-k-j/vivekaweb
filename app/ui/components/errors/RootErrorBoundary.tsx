import { isRouteErrorResponse } from "react-router";
import type { Route } from "../../../+types/root";

export function RootErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="error-boundary">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && <pre>{stack}</pre>}
    </div>
  );


}
