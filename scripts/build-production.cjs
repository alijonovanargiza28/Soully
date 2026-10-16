const { spawnSync } = require("node:child_process");
const api = (process.env.REACT_APP_API_URL || "/api").trim().replace(/\/$/, "");
if (!/^\/(?!\/)[^?#]*$/.test(api)) {
  const url = new URL(api);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash)
    throw new Error(
      "Production API URL must be a same-origin path or an HTTPS URL without credentials.",
    );
}
const result = spawnSync(process.execPath, [require.resolve("react-scripts/scripts/build")], {
  stdio: "inherit",
  env: { ...process.env, REACT_APP_API_URL: api },
});
process.exit(result.status ?? 1);
