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
  blockhash: z.optional(z.string()),
});
export const GetRawTransactionOutputSchema = z.extend(RPCResponse, {
  result: z.union([
    z.string(),
    z.object({
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
  ]),
});

export const GetBlockHashInputSchema = z.extend(RPCRequest, {
  height: z.number(),
});
export const GetBlockHashOutputSchema = z.extend(RPCResponse, {
  result: z.string(),
});

export const GetBlockInputSchema = z.extend(RPCRequest, {
  blockhash: z.string(),
  verbosity: z.optional(z.number()), // 0 for hex, 1 for json object, 2 for json with tx data
});
export const GetBlockOutputSchema = z.extend(RPCResponse, {
  result: z.union([
    z.string(), // verbosity = 0: hex-encoded data
    z.object({
      // verbosity = 1 or 2
      hash: z.string(),
      confirmations: z.number(),
      size: z.number(),
      strippedsize: z.optional(z.number()),
      weight: z.optional(z.number()),
      height: z.number(),
      version: z.number(),
      versionHex: z.optional(z.string()),
      merkleroot: z.string(),
      tx: z.array(z.union([z.string(), z.unknown()])), // strings for verbosity=1, objects for verbosity=2
      time: z.number(),
      mediantime: z.optional(z.number()),
      nonce: z.number(),
      bits: z.string(),
      difficulty: z.number(),
      chainwork: z.optional(z.string()),
      nTx: z.optional(z.number()),
      previousblockhash: z.optional(z.string()),
      nextblockhash: z.optional(z.string()),
    }),
  ]),
});

export const GetRawMempoolInputSchema = z.extend(RPCRequest, {
  verbose: z.optional(z.boolean()),
  mempool_sequence: z.optional(z.boolean()),
});
export const GetRawMempoolOutputSchema = z.extend(RPCResponse, {
  result: z.union([
    z.array(z.string()), // verbose = false: array of txids
    z.record(
      z.string(),
      z.object({
        // verbose = true: object with tx details
        vsize: z.number(),
        weight: z.optional(z.number()),
        fee: z.optional(z.number()),
        modifiedfee: z.optional(z.number()),
        time: z.number(),
        height: z.number(),
        descendantcount: z.number(),
        descendantsize: z.number(),
        descendantfees: z.optional(z.number()),
        ancestorcount: z.number(),
        ancestorsize: z.number(),
        ancestorfees: z.optional(z.number()),
        wtxid: z.optional(z.string()),
        fees: z.optional(
          z.object({
            base: z.number(),
            modified: z.number(),
            ancestor: z.number(),
            descendant: z.number(),
          }),
        ),
        depends: z.array(z.string()),
        spentby: z.optional(z.array(z.string())),
        "bip125-replaceable": z.optional(z.boolean()),
        unbroadcast: z.optional(z.boolean()),
      }),
    ),
    z.object({
      // mempool_sequence = true
      txids: z.array(z.string()),
      mempool_sequence: z.number(),
    }),
  ]),
});

export const GetMempoolInfoInputSchema = z.extend(RPCRequest, {});
export const GetMempoolInfoOutputSchema = z.extend(RPCResponse, {
  result: z.object({
    loaded: z.optional(z.boolean()),
    size: z.number(),
    bytes: z.number(),
    usage: z.number(),
    maxmempool: z.optional(z.number()),
    mempoolminfee: z.optional(z.number()),
    minrelaytxfee: z.optional(z.number()),
    unbroadcastcount: z.optional(z.number()),
  }),
});

export const GetBestBlockHashInputSchema = z.extend(RPCRequest, {});
export const GetBestBlockHashOutputSchema = z.extend(RPCResponse, {
  result: z.string(), // hex-encoded block hash
});

export const GetBlockCountInputSchema = z.extend(RPCRequest, {});
export const GetBlockCountOutputSchema = z.extend(RPCResponse, {
  result: z.number(), // current block count
});

export const GetBlockchainInfoInputSchema = z.extend(RPCRequest, {});
export const GetBlockchainInfoOutputSchema = z.extend(RPCResponse, {
  result: z.object({
    chain: z.string(),
    blocks: z.number(),
    headers: z.number(),
    bestblockhash: z.string(),
    difficulty: z.number(),
    mediantime: z.number(),
    verificationprogress: z.number(),
    initialblockdownload: z.boolean(),
    chainwork: z.string(),
    size_on_disk: z.number(),
    pruned: z.boolean(),
    pruneheight: z.optional(z.number()),
    automatic_pruning: z.optional(z.boolean()),
    prune_target_size: z.optional(z.number()),
    softforks: z.optional(
      z.union([z.array(z.unknown()), z.record(z.string(), z.unknown())]),
    ),
    bip9_softforks: z.optional(z.record(z.string(), z.unknown())),
    warnings: z.optional(z.string()),
  }),
});

export const UptimeInputSchema = z.extend(RPCRequest, {});
export const UptimeOutputSchema = z.extend(RPCResponse, {
  result: z.number(), // seconds server has been running
});

export const ListUnspentInputSchema = z.extend(RPCRequest, {
  minconf: z.optional(z.number()),
  maxconf: z.optional(z.number()),
  addresses: z.optional(z.array(z.string())),
  include_unsafe: z.optional(z.boolean()),
  query_options: z.optional(
    z.object({
      minimumAmount: z.optional(z.number()),
      maximumAmount: z.optional(z.number()),
      maximumCount: z.optional(z.number()),
      minimumSumAmount: z.optional(z.number()),
    }),
  ),
});
export const ListUnspentOutputSchema = z.extend(RPCResponse, {
  result: z.array(
    z.object({
      txid: z.string(),
      vout: z.number(),
      address: z.optional(z.string()),
      account: z.optional(z.string()),
      scriptPubKey: z.string(),
      amount: z.number(),
      confirmations: z.number(),
      redeemScript: z.optional(z.string()),
      spendable: z.boolean(),
      solvable: z.boolean(),
      safe: z.optional(z.boolean()),
    }),
  ),
});

export const ValidateAddressInputSchema = z.extend(RPCRequest, {
  address: z.string(),
});
export const ValidateAddressOutputSchema = z.extend(RPCResponse, {
  result: z.object({
    isvalid: z.boolean(),
    address: z.optional(z.string()),
    scriptPubKey: z.optional(z.string()),
    isscript: z.optional(z.boolean()),
    iswitness: z.optional(z.boolean()),
    witness_version: z.optional(z.number()),
    witness_program: z.optional(z.string()),
  }),
});

export const PingInputSchema = z.extend(RPCRequest, {});
export const PingOutputSchema = z.extend(RPCResponse, {
  result: z.null(), // ping returns null
});

export const SendRawTransactionInputSchema = z.extend(RPCRequest, {
  hexstring: z.string(),
  maxfeerate: z.optional(z.union([z.number(), z.string()])),
});
export const SendRawTransactionOutputSchema = z.extend(RPCResponse, {
  result: z.string(), // transaction hash in hex
});

export type Inputs =
  | z.infer<typeof GetRawTransactionInputSchema>
  | z.infer<typeof GetNetworkInfoInputSchema>
  | z.infer<typeof EstimateSmartFeeInputSchema>
  | z.infer<typeof GetBlockHashInputSchema>
  | z.infer<typeof GetBlockInputSchema>
  | z.infer<typeof GetRawMempoolInputSchema>
  | z.infer<typeof GetMempoolInfoInputSchema>
  | z.infer<typeof GetBestBlockHashInputSchema>
  | z.infer<typeof GetBlockCountInputSchema>
  | z.infer<typeof GetBlockchainInfoInputSchema>
  | z.infer<typeof UptimeInputSchema>
  | z.infer<typeof ListUnspentInputSchema>
  | z.infer<typeof ValidateAddressInputSchema>
  | z.infer<typeof PingInputSchema>
  | z.infer<typeof SendRawTransactionInputSchema>;

export type Outputs =
  | z.infer<typeof GetRawTransactionOutputSchema>
  | z.infer<typeof GetNetworkInfoOutputSchema>
  | z.infer<typeof EstimateSmartFeeOutputSchema>
  | z.infer<typeof GetBlockHashOutputSchema>
  | z.infer<typeof GetBlockOutputSchema>
  | z.infer<typeof GetRawMempoolOutputSchema>
  | z.infer<typeof GetMempoolInfoOutputSchema>
  | z.infer<typeof GetBestBlockHashOutputSchema>
  | z.infer<typeof GetBlockCountOutputSchema>
  | z.infer<typeof GetBlockchainInfoOutputSchema>
  | z.infer<typeof UptimeOutputSchema>
  | z.infer<typeof ListUnspentOutputSchema>
  | z.infer<typeof ValidateAddressOutputSchema>
  | z.infer<typeof PingOutputSchema>
  | z.infer<typeof SendRawTransactionOutputSchema>;
