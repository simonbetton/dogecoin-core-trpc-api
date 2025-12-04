import { dogecoinCoreRpcApi } from "../lib/dogecoin-core-rpc-api-client";
import {
  EstimateSmartFeeInputSchema,
  EstimateSmartFeeOutputSchema,
  GetBestBlockHashInputSchema,
  GetBestBlockHashOutputSchema,
  GetBlockCountInputSchema,
  GetBlockCountOutputSchema,
  GetBlockHashInputSchema,
  GetBlockHashOutputSchema,
  GetBlockInputSchema,
  GetBlockOutputSchema,
  GetMempoolInfoInputSchema,
  GetMempoolInfoOutputSchema,
  GetNetworkInfoInputSchema,
  GetNetworkInfoOutputSchema,
  GetRawMempoolInputSchema,
  GetRawMempoolOutputSchema,
  GetRawTransactionInputSchema,
  GetRawTransactionOutputSchema,
  PingInputSchema,
  PingOutputSchema,
  SendRawTransactionInputSchema,
  SendRawTransactionOutputSchema,
  ValidateAddressInputSchema,
  ValidateAddressOutputSchema,
} from "../lib/schemas";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  estimateSmartFee: publicProcedure
    .input(EstimateSmartFeeInputSchema)
    .output(EstimateSmartFeeOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "estimatesmartfee",
        args: input,
      });
    }),
  getNetworkInfo: publicProcedure
    .input(GetNetworkInfoInputSchema)
    .output(GetNetworkInfoOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getnetworkinfo",
        args: input,
      });
    }),
  getRawTransaction: publicProcedure
    .input(GetRawTransactionInputSchema)
    .output(GetRawTransactionOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getrawtransaction",
        args: input,
      });
    }),
  getBlockHash: publicProcedure
    .input(GetBlockHashInputSchema)
    .output(GetBlockHashOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getblockhash",
        args: input,
      });
    }),
  getBlock: publicProcedure
    .input(GetBlockInputSchema)
    .output(GetBlockOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({ methodName: "getblock", args: input });
    }),
  getRawMempool: publicProcedure
    .input(GetRawMempoolInputSchema)
    .output(GetRawMempoolOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getrawmempool",
        args: input,
      });
    }),
  getMempoolInfo: publicProcedure
    .input(GetMempoolInfoInputSchema)
    .output(GetMempoolInfoOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getmempoolinfo",
        args: input,
      });
    }),
  getBestBlockHash: publicProcedure
    .input(GetBestBlockHashInputSchema)
    .output(GetBestBlockHashOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getbestblockhash",
        args: input,
      });
    }),
  getBlockCount: publicProcedure
    .input(GetBlockCountInputSchema)
    .output(GetBlockCountOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getblockcount",
        args: input,
      });
    }),
  validateAddress: publicProcedure
    .input(ValidateAddressInputSchema)
    .output(ValidateAddressOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "validateaddress",
        args: input,
      });
    }),
  ping: publicProcedure
    .input(PingInputSchema)
    .output(PingOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({ methodName: "ping", args: input });
    }),
  sendRawTransaction: publicProcedure
    .input(SendRawTransactionInputSchema)
    .output(SendRawTransactionOutputSchema)
    .mutation(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "sendrawtransaction",
        args: input,
      });
    }),
  health: publicProcedure.query(() => {
    return { status: "ok", message: "Dogecoin API is running!" };
  }),
});
export type AppRouter = typeof appRouter;
