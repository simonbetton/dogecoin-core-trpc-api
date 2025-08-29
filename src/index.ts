import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./server";
import { env } from "./lib/env";

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
