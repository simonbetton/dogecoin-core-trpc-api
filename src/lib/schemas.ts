import { z } from "zod/v4-mini";

// Base Dogecoin Core RPC response
const RPCResponse = z.object({
	result: z.unknown(),
	id: z.nullable(z.string()),
	error: z.nullable(z.object({ message: z.string() })),
});

// Base Dogecoin Core RPC request
const RPCRequest = z.object({
	requestId: z.nullable(z.string()),
});

export const EstimateSmartFeeInputSchema = z.extend(RPCRequest, {
	nblocks: z.number(),
});
export const EstimateSmartFeeOutputSchema = z.extend(RPCResponse, {
	result: z.object({
		feerate: z.number(),
		blocks: z.number(),
	}),
});

export const GetNetworkInfoInputSchema = z.extend(RPCRequest, {});
export const GetNetworkInfoOutputSchema = z.extend(RPCResponse, {
	result: z.object({
		version: z.number(),
		subversion: z.string(),
		protocolversion: z.number(),
		localservices: z.string(),
		localrelay: z.boolean(),
		timeoffset: z.number(),
		networkactive: z.boolean(),
		connections: z.number(),
		networks: z.array(
			z.object({
				name: z.string(),
				limited: z.boolean(),
				reachable: z.boolean(),
				proxy: z.string(),
				proxy_randomize_credentials: z.boolean(),
			}),
		),
		relayfee: z.number(),
		incrementalfee: z.number(),
		softdustlimit: z.number(),
		harddustlimit: z.number(),
		localaddresses: z.array(
			z.object({
				address: z.string(),
				port: z.number(),
				score: z.number(),
			}),
		),
		warnings: z.optional(z.string()),
	}),
});

export const GetRawTransactionInputSchema = z.extend(RPCRequest, {
	txid: z.string(),
	verbose: z.optional(z.boolean()),
});
export const GetRawTransactionOutputSchema = z.extend(RPCResponse, {
	result: z.object({
		hex: z.string(),
		txid: z.string(),
		hash: z.string(),
		size: z.number(),
		vsize: z.number(),
		version: z.number(),
		locktime: z.number(),
		vin: z.array(
			z.object({
				txid: z.optional(z.string()),
				vout: z.optional(z.number()),
				scriptSig: z.optional(
					z.object({
						asm: z.string(),
						hex: z.string(),
					}),
				),
				sequence: z.optional(z.number()),
			}),
		),
		vout: z.array(
			z.object({
				value: z.number(),
				n: z.number(),
				scriptPubKey: z.object({
					asm: z.string(),
					hex: z.string(),
					reqSigs: z.optional(z.number()),
					type: z.string(),
					addresses: z.array(z.string()),
				}),
			}),
		),
		blockhash: z.optional(z.string()),
		confirmations: z.optional(z.number()),
		time: z.optional(z.number()),
		blocktime: z.optional(z.number()),
	}),
});

export type Inputs =
	| z.infer<typeof GetRawTransactionInputSchema>
	| z.infer<typeof GetNetworkInfoInputSchema>
	| z.infer<typeof EstimateSmartFeeInputSchema>;

export type Outputs =
	| z.infer<typeof GetRawTransactionOutputSchema>
	| z.infer<typeof GetNetworkInfoOutputSchema>
	| z.infer<typeof EstimateSmartFeeOutputSchema>;
