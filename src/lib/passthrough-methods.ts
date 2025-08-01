import { z } from "zod";
import { getrawtransaction } from "./methods/getrawtransaction";
import { estimatesmartfee } from "./methods/estimatesmartfee";
import { getnetworkinfo } from "./methods/getnetworkinfo";

export const RPCResponse = z.object({
  result: z.unknown(),
  id: z.string().nullable(),
  error: z.object({ message: z.string() }).nullable(),
});

export const RPCRequest = z.object({
  requestId: z.uuid(),
});

export const RPCMethods = {
  estimatesmartfee,
  getrawtransaction,
  getnetworkinfo,
} as const;

export type Methods = typeof RPCMethods;
export type MethodName = keyof Methods;
