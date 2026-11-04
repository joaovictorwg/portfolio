import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// R2 incremental cache disabled for now (no bucket created yet).
// Re-enable by importing r2IncrementalCache and setting incrementalCache.
export default defineCloudflareConfig({});
