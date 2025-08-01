import z from "zod";
import { RPCRequest, RPCResponse } from "../passthrough-methods";

export const getnetworkinfo = {
  input: RPCRequest.extend({}),
  output: RPCResponse.extend({
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
      })
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
      })
    ),
    warnings: z.string().optional(),
  }),
};
