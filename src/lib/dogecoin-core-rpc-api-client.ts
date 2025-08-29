import type { Options, ResponsePromise } from "ky";
import { env } from "./env";
import { createHttpClient } from "./http-client";
import type { Inputs, Outputs } from "./schemas";

const client = createHttpClient("DOGECOIN_CORE_RPC_API_CLIENT", {
	prefixUrl: env.RPC_URL,
	headers: {
		"user-agent": "internal-dogecoin-core-api",
		Authorization: `Basic ${Buffer.from(
			`${env.RPC_USER}:${env.RPC_PASS}`,
		).toString("base64")}`,
	},
});

export const dogecoinCoreRpcApi = ({
	methodName,
	args,
	options,
}: {
	methodName: MethodName;
	args: Inputs;
	options?: Omit<Options, "method" | "json">;
}): ResponsePromise<Outputs> => {
	// Extract requestId from args, use the rest as RPC parameters
	const { requestId, ...params } = args;
	return client.post("", {
		json: {
			jsonrpc: "1.0",
			id: requestId,
			method: methodName,
			params: Object.values(params), // Convert to array for JSON-RPC
		},
		...options,
	});
};

const SupportedDogecoinCoreRPCMethods = [
	"estimatesmartfee",
	"getrawtransaction",
	"getnetworkinfo",
] as const;
type MethodName = (typeof SupportedDogecoinCoreRPCMethods)[number];
