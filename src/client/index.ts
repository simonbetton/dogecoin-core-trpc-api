import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../server";

type HttpBatchLinkOptions = Parameters<typeof httpBatchLink>[0];

export const DEFAULT_TRPC_URL = "https://rpc.dogeapi.io";

export type DogecoinCoreClientOptions = Omit<
  HttpBatchLinkOptions,
  "transformer" | "url"
> & {
  url?: HttpBatchLinkOptions["url"];
};

export function createDogecoinCoreClient(
  options: DogecoinCoreClientOptions = {},
) {
  const { url = DEFAULT_TRPC_URL, ...rest } = options;

  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        ...rest,
        url,
        transformer: superjson,
      }),
    ],
  });
}

export type DogecoinCoreClient = ReturnType<typeof createDogecoinCoreClient>;
export type { AppRouter };
