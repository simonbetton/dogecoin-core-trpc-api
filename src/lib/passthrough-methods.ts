import { z } from "zod";

const RPCResponse = z.object({
  result: z.unknown(),
  id: z.string().nullable(),
  error: z.object({ message: z.string() }).nullable(),
});

const RPCRequest = z.object({
  requestId: z.uuid(),
});

export const RPCMethods = {
  estimatesmartfee: {
    input: RPCRequest.extend({ nblocks: z.number() }),
    output: RPCResponse.extend({
      result: z.object({
        feerate: z.number(),
        blocks: z.number(),
      }),
    }),
  },
} as const;

export type Methods = typeof RPCMethods;
export type MethodName = keyof Methods;
