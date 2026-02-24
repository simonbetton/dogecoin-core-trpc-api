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
  GetBlockHeaderInputSchema,
  GetBlockHeaderOutputSchema,
  GetBlockInputSchema,
  GetBlockOutputSchema,
  GetChainTipsInputSchema,
  GetChainTipsOutputSchema,
  GetDifficultyInputSchema,
  GetDifficultyOutputSchema,
  GetMempoolAncestorsInputSchema,
  GetMempoolAncestorsOutputSchema,
  GetMempoolDescendantsInputSchema,
  GetMempoolDescendantsOutputSchema,
  GetMempoolEntryInputSchema,
  GetMempoolEntryOutputSchema,
  GetMempoolInfoInputSchema,
  GetMempoolInfoOutputSchema,
  GetNetworkHashPsInputSchema,
  GetNetworkHashPsOutputSchema,
  GetNetworkInfoInputSchema,
  GetNetworkInfoOutputSchema,
  GetRawMempoolInputSchema,
  GetRawMempoolOutputSchema,
  GetRawTransactionInputSchema,
  GetRawTransactionOutputSchema,
  GetTxOutInputSchema,
  GetTxOutOutputSchema,
  GetTxOutProofInputSchema,
  GetTxOutProofOutputSchema,
  ListUnspentInputSchema,
  ListUnspentOutputSchema,
  PingInputSchema,
  PingOutputSchema,
  SendRawTransactionInputSchema,
  SendRawTransactionOutputSchema,
  ValidateAddressInputSchema,
  ValidateAddressOutputSchema,
  VerifyTxOutProofInputSchema,
  VerifyTxOutProofOutputSchema,
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
  getBlockHeader: publicProcedure
    .input(GetBlockHeaderInputSchema)
    .output(GetBlockHeaderOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getblockheader",
        args: input,
      });
    }),
  getTxOut: publicProcedure
    .input(GetTxOutInputSchema)
    .output(GetTxOutOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "gettxout",
        args: input,
      });
    }),
  getChainTips: publicProcedure
    .input(GetChainTipsInputSchema)
    .output(GetChainTipsOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getchaintips",
        args: input,
      });
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
  getMempoolEntry: publicProcedure
    .input(GetMempoolEntryInputSchema)
    .output(GetMempoolEntryOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getmempoolentry",
        args: input,
      });
    }),
  getMempoolAncestors: publicProcedure
    .input(GetMempoolAncestorsInputSchema)
    .output(GetMempoolAncestorsOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getmempoolancestors",
        args: input,
      });
    }),
  getMempoolDescendants: publicProcedure
    .input(GetMempoolDescendantsInputSchema)
    .output(GetMempoolDescendantsOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getmempooldescendants",
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
  getDifficulty: publicProcedure
    .input(GetDifficultyInputSchema)
    .output(GetDifficultyOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "getdifficulty",
        args: input,
      });
    }),
  getNetworkHashPs: publicProcedure
    .input(GetNetworkHashPsInputSchema)
    .output(GetNetworkHashPsOutputSchema)
    .query(async ({ input }) => {
      const args = {
        requestId: input.requestId,
        nblocks: input.nblocks ?? 120,
        height: input.height ?? -1,
      };

      return await dogecoinCoreRpcApi({
        methodName: "getnetworkhashps",
        args,
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
  getTxOutProof: publicProcedure
    .input(GetTxOutProofInputSchema)
    .output(GetTxOutProofOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "gettxoutproof",
        args: input,
      });
    }),
  verifyTxOutProof: publicProcedure
    .input(VerifyTxOutProofInputSchema)
    .output(VerifyTxOutProofOutputSchema)
    .query(async ({ input }) => {
      return await dogecoinCoreRpcApi({
        methodName: "verifytxoutproof",
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
