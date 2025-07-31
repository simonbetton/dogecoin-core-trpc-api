import { serve } from "@hono/node-server";
import { app } from "./server";

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`🚀 Dogecoin API is running on http://localhost:${info.port}`);
  }
);
