# Contributing

## Development

Clone the repository and open it in VS Code. Press **F5** to launch an Extension Development Host with the plugin loaded.

To run against a locally built `rite-ls`, set `rite.server.path` to the absolute path of your binary. Easiest is a workspace-level setting:

```jsonc
// .vscode/settings.json
{
  "rite.server.path": "/abs/path/to/rite-ls"
}
```

Setting it at user level works too, but a workspace setting keeps the override scoped to this repo.

## Packaging

The extension is packaged with [`@vscode/vsce`](https://github.com/microsoft/vscode-vsce):

```bash
npx @vscode/vsce package --no-dependencies --target <platform>
```

Targets match the binary directories under `bin/` (e.g., `darwin-arm64`, `linux-x64`, `win32-x64`). CI runs this for every supported target on push and pull request.

## Updating the bundled rite-ls

The bundled `rite-ls` version is pinned in `package.json` under the `riteLsVersion` field. Renovate auto-opens PRs when a new release lands on [`rite-ly/rite`](https://github.com/rite-ly/rite/releases), running `scripts/download-rite-ls.sh` as a post-upgrade task to refresh the binaries under `bin/`.

To update manually, pass the target version:

```bash
./scripts/download-rite-ls.sh 0.1.0-rc.8
```

The script downloads the matching release assets from `rite-ly/rite` and places them under `bin/`.
