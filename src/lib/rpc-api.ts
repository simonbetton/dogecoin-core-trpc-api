import type { Options } from "ky";
import { env } from "./env";
import { createHttpClient } from "./http-client";

const client = createHttpClient("RPC_API", {
  prefixUrl: env.RPC_URL,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${env.RPC_USER}:${env.RPC_PASS}`
    ).toString("base64")}`,
  },
});

// The `api` method is used to make RPC calls and the method name is
// passed within the json body, not as part of the URL.
export const api = (options: Options) => client.post("", options);
