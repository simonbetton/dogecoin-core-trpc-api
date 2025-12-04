import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { env } from "./lib/env";
import { appRouter } from "./server";

const server = createHTTPServer({
  router: appRouter,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});

server.listen(3000);
