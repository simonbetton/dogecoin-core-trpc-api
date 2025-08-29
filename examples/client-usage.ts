import { trpc } from "../src/client";

/**
 * Example: Using the Dogecoin Core tRPC API Client
 *
 * This example shows how to use the tRPC client to interact with
 * the Dogecoin Core API service.
 */
async function main() {
  console.log("🚀 Dogecoin Core tRPC API Client Example");

  // Use tRPC client from client exported
  const client = trpc;

  try {
    // Health check
    console.log("\n📡 Checking API health...");
    const health = await client.health.query();
    console.log("Health:", health);

    // Get network information
    console.log("\n🌐 Getting network information...");
    const networkInfo = await client.getNetworkInfo.query({
      requestId: `network-info-${Date.now()}`,
    });
    console.log("Network Info:", {
      version: networkInfo.result.version,
      subversion: networkInfo.result.subversion,
      protocolversion: networkInfo.result.protocolversion,
      connections: networkInfo.result.connections,
    });

    // Estimate smart fee
    console.log("\n💰 Estimating smart fee...");
    const feeEstimate = await client.estimateSmartFee.query({
      requestId: `fee-estimate-${Date.now()}`,
      nblocks: 4,
    });
    console.log("Fee Estimate:", feeEstimate.result);

    // Get raw transaction (example with a transaction ID)
    // Note: This requires a valid transaction ID from your Dogecoin node
    console.log("\n📄 Getting raw transaction...");
    const rawTx = await client.getRawTransaction.query({
      requestId: `raw-tx-${Date.now()}`,
      txid: "919e7ea9f5ca0d52a940bcd8c3287c3a0459094a31d75ef46b2b66fb09af22c0 ", // Some random txid
      verbose: true,
    });
    console.log("Raw Transaction:", rawTx);
  } catch (error) {
    console.error("❌ Error:", error);

    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        console.log("\n💡 Tip: Make sure you can access https://dogeapi.io");
      }
    }
  }
}

// Run the example
main().catch(console.error);
