import { dogecoinCoreRpcApi } from "../lib/dogecoin-core-rpc-api-client";
import {
  EstimateSmartFeeInputSchema,
  EstimateSmartFeeOutputSchema,
  GetBestBlockHashInputSchema,
  GetBestBlockHashOutputSchema,
  GetBlockCountInputSchema,
  GetBlockCountOutputSchema,
  GetBlockchainInfoInputSchema,
  GetBlockchainInfoOutputSchema,
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
  ListUnspentInputSchema,
  ListUnspentOutputSchema,
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
  getBlockchainInfo: publicProcedure
    .input(GetBlockchainInfoInputSchema)
    .output(GetBlockchainInfoOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getblockchaininfo",
        args: input,
      });
    }),
  listUnspent: publicProcedure
    .input(ListUnspentInputSchema)
    .output(ListUnspentOutputSchema)
    .query(async ({ input }) => {
      const args = {
        requestId: input.requestId,
        minconf: input.minconf ?? 1,
        maxconf: input.maxconf ?? 9999999,
        addresses: input.addresses ?? [],
        include_unsafe: input.include_unsafe ?? true,
        ...(input.query_options ? { query_options: input.query_options } : {}),
      };

      return await dogecoinCoreRpcApi({
        methodName: "listunspent",
        args,
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
