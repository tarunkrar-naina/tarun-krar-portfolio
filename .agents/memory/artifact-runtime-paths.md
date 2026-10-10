---
name: Artifact runtime paths
description: A runtime path rule for files used by independently configured Replit artifacts.
---

Service workflows may start with different working directories than local commands or preview tooling. File-backed server data should resolve from the workspace-root and service-root candidates rather than assuming one current directory.

**Why:** The API workflow can be healthy while a relative data path still produces a runtime 500 when the server is reached through the artifact proxy.

**How to apply:** When adding JSON, uploads, or other persistent local files to a service, resolve the path defensively and verify it through the proxied route after restarting the workflow.