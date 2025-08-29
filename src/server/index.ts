import { dogecoinCoreRpcApi } from "../lib/dogecoin-core-rpc-api-client";
import {
	EstimateSmartFeeInputSchema,
	EstimateSmartFeeOutputSchema,
	GetNetworkInfoInputSchema,
	GetNetworkInfoOutputSchema,
	GetRawTransactionInputSchema,
	GetRawTransactionOutputSchema,
} from "../lib/schemas";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	estimateSmartFee: publicProcedure
		.input(EstimateSmartFeeInputSchema)
		.output(EstimateSmartFeeOutputSchema)
		.query(async ({ input }) => {
			const response = await dogecoinCoreRpcApi({
				methodName: "estimatesmartfee",
				args: input,
			});
			return await response.json();
		}),
	getNetworkInfo: publicProcedure
		.input(GetNetworkInfoInputSchema)
		.output(GetNetworkInfoOutputSchema)
		.query(async ({ input }) => {
			const response = await dogecoinCoreRpcApi({
				methodName: "getnetworkinfo",
				args: input,
			});
			return await response.json();
		}),
	getRawTransaction: publicProcedure
		.input(GetRawTransactionInputSchema)
		.output(GetRawTransactionOutputSchema)
		.query(async ({ input }) => {
			const response = await dogecoinCoreRpcApi({
				methodName: "getrawtransaction",
				args: input,
			});
			return await response.json();
		}),

	// Health check endpoint
	health: publicProcedure.query(() => {
		return { status: "ok", message: "Dogecoin API is running!" };
	}),
});
export type AppRouter = typeof appRouter;
