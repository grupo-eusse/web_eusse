import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const navbarSource = await readFile(
  new URL("../ui/components/navbar.tsx", import.meta.url),
  "utf8",
);

assert.match(
  navbarSource,
  /QUICKSTATION_LOGIN_URL = "https:\/\/quickstation\.eusse\.cr\/login"/,
);
assert.match(navbarSource, /href=\{QUICKSTATION_LOGIN_URL\}/);
assert.match(navbarSource, /src="\/logo-quick-station\.png"/);
