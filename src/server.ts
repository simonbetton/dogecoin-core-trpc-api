import { Hono } from "hono";
import { RPCMethods, type MethodName } from "./lib/passthrough-methods";
import { api } from "./lib/rpc-api";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Welcome to the Dogecoin API!");
});

app.post("/rpc/:method", async (c) => {
  const methodParam = c.req.param("method") as MethodName;
  console.log(`Received RPC call for method: ${methodParam}`);
  const method = RPCMethods[methodParam];
  if (!method) return c.json({ error: "Unknown method" }, 404);

  const body = await c.req.json();

  // ✅ Validate input
  const parsedInput = method.input.safeParse(body);
  if (!parsedInput.success) {
    return c.json(
      { error: "Invalid input", issues: parsedInput.error.issues },
      400
    );
  }

  // omitting `requestId` from `args` as its used for the RPC request ID and not for the method call
  const { requestId, ...args } = parsedInput.data;

  // 🔗 Call upstream RPC
  const response = await api({
    json: {
      jsonrpc: "1.0",
      id: requestId,
      method: methodParam,
      params: Object.values(args), // Turn parsed input into arguments
    },
  });

  const rawOutput = await response.json();

  // ✅ Validate output
  const parsedOutput = method.output.safeParse(rawOutput);
  if (!parsedOutput.success) {
    return c.json(
      { error: "Invalid upstream response", issues: parsedOutput.error.issues },
      502
    );
  }

  return c.json(parsedOutput.data);
});

export { app };
