import { TRPCError } from "@trpc/server";
import type { Options } from "ky";
import { env } from "./env";
import { createHttpClient, HTTPError } from "./http-client";
import type { Inputs } from "./schemas";

const client = createHttpClient("DOGECOIN_CORE_RPC_API_CLIENT", {
  prefix: env.RPC_URL,
  headers: {
    "user-agent": "internal-dogecoin-core-api",
    Authorization: `Basic ${Buffer.from(
      `${env.RPC_USER}:${env.RPC_PASS}`,
    ).toString("base64")}`,
  },
});

export async function dogecoinCoreRpcApi<T>({
  methodName,
  args,
  options,
}: {
  methodName: MethodName;
  args: Inputs;
  options?: Omit<Options, "method" | "json">;
}): Promise<T> {
  // Extract requestId from args, use the rest as RPC parameters
  const { requestId, ...params } = args;

  try {
    const response = await client.post("", {
      json: {
        jsonrpc: "1.0",
        id: requestId,
        method: methodName,
        params: Object.values(params), // Convert to array for JSON-RPC
      },
      ...options,
    });
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof HTTPError) {
      let errorBody:
        | { error?: { message?: string; code?: number } }
        | undefined;
      try {
        errorBody = await error.response.json();
      } catch {
        // Failed to parse JSON body
      }

      const message =
        errorBody?.error?.message ||
        `RPC request failed with status ${error.response.status}`;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message,
        cause: errorBody,
      });
    }
    throw error;
  }
}

const SupportedDogecoinCoreRPCMethods = [
  "estimatesmartfee",
  "getbestblockhash",
  "getblock",
  "getblockchaininfo",
  "getblockcount",
  "getblockhash",
  "getblockheader",
  "getchaintips",
  "getdifficulty",
  "getmempoolancestors",
  "getmempooldescendants",
  "getmempoolentry",
  "getmempoolinfo",
  "getnetworkhashps",
  "getnetworkinfo",
  "getrawmempool",
  "getrawtransaction",
  "gettxout",
  "gettxoutproof",
  "listunspent",
  "ping",
  "sendrawtransaction",
  "uptime",
  "validateaddress",
  "verifytxoutproof",
] as const;
type MethodName = (typeof SupportedDogecoinCoreRPCMethods)[number];
