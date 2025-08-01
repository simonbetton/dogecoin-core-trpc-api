import z from "zod";
import { RPCRequest, RPCResponse } from "../passthrough-methods";

export const estimatesmartfee = {
  input: RPCRequest.extend({ nblocks: z.number() }),
  output: RPCResponse.extend({
    result: z.object({
      feerate: z.number(),
      blocks: z.number(),
    }),
  }),
};
