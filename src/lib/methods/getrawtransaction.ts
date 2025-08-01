import z from "zod";
import { RPCRequest, RPCResponse } from "../passthrough-methods";

export const getrawtransaction = {
  input: RPCRequest.extend({
    txid: z.string(),
    verbose: z.boolean().optional().default(false),
  }),
  output: RPCResponse.extend({
    hex: z.string(),
    txid: z.string(),
    hash: z.string(),
    size: z.number(),
    vsize: z.number(),
    version: z.number(),
    locktime: z.number(),
    vin: z.array(
      z.object({
        txid: z.string(),
        vout: z.number(),
        scriptSig: z.object({
          asm: z.string(),
          hex: z.string(),
        }),
        sequence: z.number(),
      })
    ),
    vout: z.array(
      z.object({
        value: z.number(),
        n: z.number(),
        scriptPubKey: z.object({
          asm: z.string(),
          hex: z.string(),
          reqSigs: z.number().optional(),
          type: z.string(),
          addresses: z.array(z.string()),
        }),
      })
    ),
    blockhash: z.string().optional(),
    confirmations: z.number().optional(),
    time: z.number().optional(),
    blocktime: z.number().optional(),
  }),
};
