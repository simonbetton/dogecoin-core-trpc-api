import { TRPCClientError } from "@trpc/client";
import { createDogecoinCoreClient } from "../dist/client";

/**
 * Example: Using the Dogecoin Core tRPC API Client
 *
 * This example shows how to use the tRPC client to interact with
 * the Dogecoin Core API service.
 */
async function main() {
  console.log("🚀 Dogecoin Core tRPC API Client Example");

  const client = createDogecoinCoreClient();

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
      txid: "919e7ea9f5ca0d52a940bcd8c3287c3a0459094a31d75ef46b2b66fb09af22c0", // Some random txid
      verbose: true,
    });
    console.log("Raw Transaction:", rawTx);
    console.log("Raw Transaction error:", rawTx.error);

    // Get best block hash
    console.log("\n🔗 Getting best block hash...");
    const bestBlockHash = await client.getBestBlockHash.query({
      requestId: `best-block-hash-${Date.now()}`,
    });
    console.log("Best Block Hash:", bestBlockHash.result);

    // Get block count
    console.log("\n📊 Getting block count...");
    const blockCount = await client.getBlockCount.query({
      requestId: `block-count-${Date.now()}`,
    });
    console.log("Block Count:", blockCount.result);

    // Get blockchain info
    console.log("\n⛓️ Getting blockchain info...");
    const blockchainInfo = await client.getBlockchainInfo.query({
      requestId: `blockchain-info-${Date.now()}`,
    });
    console.log("Blockchain Info:", {
      chain: blockchainInfo.result.chain,
      blocks: blockchainInfo.result.blocks,
      headers: blockchainInfo.result.headers,
      bestblockhash: blockchainInfo.result.bestblockhash,
      verificationprogress: blockchainInfo.result.verificationprogress,
      pruned: blockchainInfo.result.pruned,
    });

    // Get block hash by height
    console.log("\n🔢 Getting block hash by height...");
    const blockHash = await client.getBlockHash.query({
      requestId: `block-hash-${Date.now()}`,
      height: 1000000,
    });
    console.log("Block Hash at height 1000000:", blockHash.result);

    // Get block details
    console.log("\n📦 Getting block details...");
    const block = await client.getBlock.query({
      requestId: `block-${Date.now()}`,
      blockhash: bestBlockHash.result,
      verbosity: 1,
    });
    if (typeof block.result === "object") {
      console.log("Block:", block.result);
    }

    // Get mempool info
    console.log("\n🏊 Getting mempool info...");
    const mempoolInfo = await client.getMempoolInfo.query({
      requestId: `mempool-info-${Date.now()}`,
    });
    console.log("Mempool Info:", mempoolInfo.result);

    // Get raw mempool
    console.log("\n📋 Getting raw mempool...");
    const rawMempool = await client.getRawMempool.query({
      requestId: `raw-mempool-${Date.now()}`,
      verbose: false,
    });
    if (Array.isArray(rawMempool.result)) {
      console.log("Mempool Transactions:", rawMempool.result.length, "txs");
    }

    // List unspent outputs
    console.log("\n💼 Listing unspent outputs...");
    const unspent = await client.listUnspent.query({
      requestId: `listunspent-${Date.now()}`,
      minconf: 1,
      maxconf: 9999999,
      addresses: [],
      include_unsafe: true,
    });
    console.log("List Unspent:", unspent.result);

    // Validate address
    console.log("\n✅ Validating address...");
    const addressValidation = await client.validateAddress.query({
      requestId: `validate-address-${Date.now()}`,
      address: "DLWeDczVb1a6E3nSBD1FSqkPL4zUggybxF",
    });
    console.log("Address Validation:", addressValidation.result);

    // Ping
    console.log("\n🏓 Sending ping...");
    const ping = await client.ping.query({
      requestId: `ping-${Date.now()}`,
    });
    console.log("Ping:", ping.result === null ? "success" : ping.result);

    // Send raw transaction (example - commented out as it requires a valid signed tx)
    // console.log("\n📤 Sending raw transaction...");
    // const sendTx = await client.sendRawTransaction.mutate({
    //   requestId: `send-tx-${Date.now()}`,
    //   hexstring:
    //     "0100000001985449e5af3582c68c0b642b757536780105a05434a185f54e3a95b9d2d434ed0000000000ffffffff0100ca9a3b000000001976a914a89d10e3df3b42d43930944c2f3cffddcf916e2188ac00000000",
    // });
    // console.log("Transaction Hash:", sendTx.result);
    // console.error("Send Raw Transaction error:", sendTx.error);
  } catch (error) {
    if (error instanceof TRPCClientError) {
      console.error(`❌ tRPC Error: ${error.message}`);
    } else {
      console.error("❌ Unknown Error:", error);
    }

    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        console.log("\n💡 Tip: Make sure you can access https://dogeapi.io");
      }
    }
  }
}

// Run the example
main().catch(console.error);
