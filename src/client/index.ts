import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../server";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://rpc.dogeapi.io",
      transformer: superjson,
    }),
  ],
});
