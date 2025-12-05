#!/usr/bin/env node

import "reflect-metadata";
import "source-map-support/register.js";

import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import semverSatisfies from "semver/functions/satisfies.js";
import { inspect } from "util";
import { execute } from "@oclif/core";
import { setDefaultResultOrder } from "dns";
import { setDefaultAutoSelectFamily } from "net";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------------------------------------------------------------- */
/*                               Environment Setup                             */
/* -------------------------------------------------------------------------- */
process.env.NODE_CONFIG_DIR ||= path.join(__dirname, "config");
inspect.defaultOptions.customInspect = false;

if (process.env.NODEJS_PREFER_IPV4 === "true") {
  setDefaultResultOrder("ipv4first");
}
setDefaultAutoSelectFamily?.(false);

/* -------------------------------------------------------------------------- */
/*                           Version & Node Check                               */
/* -------------------------------------------------------------------------- */

const versionFlags = ["-v", "-V", "--version"];
if (versionFlags.includes(process.argv.at(-1))) {
  const { version } = require("../package.json");
  console.log(version);
  process.exit(0);
}

const nodeVersion = process.versions.node;
const {
  engines: { node: supportedNodeVersions },
} = require("../package.json");

if (!semverSatisfies(nodeVersion, supportedNodeVersions)) {
  console.error(
    `❌ Unsupported Node.js version ${nodeVersion}. Expected ${supportedNodeVersions}`
  );
  process.exit(1);
}

/* -------------------------------------------------------------------------- */
/*                              Command Manager Setup                           */
/* -------------------------------------------------------------------------- */

await execute({ dir: import.meta.url });
