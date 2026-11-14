import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Wrapper do build do OpenNext/Cloudflare.
 *
 * O `@swc/core` 1.16 passou a validar permissões do diretório onde materializa
 * o binding nativo. No container de build do Workers Builds ele rejeita tanto
 * `/opt/buildhome/.cache` quanto `/tmp` ("parent writable by another user
 * without trusted sticky protection") e o `next build` morre com
 * `Cannot find module './swc.linux-x64-gnu.node'` / `ERR_SWC_NATIVE_CACHE`.
 *
 * O container é isolado, então pulamos a checagem de segurança e apontamos o
 * cache para dentro do repositório. No Windows a variável é ignorada.
 * Ver https://github.com/swc-project/swc/issues/12498
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

process.env.SWC_NATIVE_BINDING_CACHE ??= path.join(root, ".swc-cache");
process.env.SWC_NATIVE_BINDING_CACHE_SKIP_SECURITY_CHECK ??= "1";

const cli = path.join(
  root,
  "node_modules",
  "@opennextjs",
  "cloudflare",
  "dist",
  "cli",
  "index.js",
);

const result = spawnSync(process.execPath, [cli, "build"], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
