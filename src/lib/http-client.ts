import type { Options } from "ky";
import ky from "ky";

export { HTTPError, TimeoutError } from "ky";

export function createHttpClient(name: string, options: Options) {
  return ky
    .extend({
      retry: {
        limit: process.env.NODE_ENV === "development" ? 1 : 3,
        delay: (attemptCount) => 0.3 * 2 ** (attemptCount - 1) * 2000, // Exponential backoff
      },
      hooks: {
        beforeRequest: [
          (request) => {
            // Log request details
            console.info(`>>> ${name}: ${request.method} ${request.url}`, {
              url: request.url,
            });
          },
        ],
        afterResponse: [
          (request, _options, response) => {
            const cleanHeaders = Object.fromEntries(request.headers.entries());
            // Remove sensitive headers
            delete cleanHeaders.authorization;
            delete cleanHeaders.cookie;
            delete cleanHeaders["x-csrf-token"];
            delete cleanHeaders["x-xsrf-token"];
            console.info(`>>> ${name}: ${request.method} ${request.url}`, {
              url: request.url,
              statusCode: response.status,
              headers: cleanHeaders,
            });
            // If not okay response, log error details
            if (!response.ok) {
              response
                .clone()
                .text()
                .then((body) => {
                  console.error(
                    `❌ ${name} Error: ${request.method} ${request.url} - Status: ${response.status} - Body: ${body}`,
                  );
                })
                .catch((err) => {
                  console.error(`❌ ${name} Error reading response body:`, err);
                });
            }
            return response;
          },
        ],
      },
    })
    .extend(options);
}
