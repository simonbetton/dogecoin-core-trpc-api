import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../server";

type HttpBatchLinkOptions = Parameters<typeof httpBatchLink>[0];

export type DogecoinCoreClientOptions = Omit<
  HttpBatchLinkOptions,
  "transformer"
>;

export function createDogecoinCoreClient(options: DogecoinCoreClientOptions) {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        ...options,
        transformer: superjson,
      }),
    ],
  });
}

export type DogecoinCoreClient = ReturnType<typeof createDogecoinCoreClient>;
export type { AppRouter };
