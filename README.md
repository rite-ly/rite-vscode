# Rite Language Server

Language support for `.rite.yaml` ceremony files from the [Rite](https://github.com/rite-ly/rite) project.

## Features

- Diagnostics (errors and warnings)
- Hover information
- Completions

The language server attaches only to `*.rite.yaml` files, so unrelated YAML documents are untouched.

## Requirements

The extension ships with a bundled `rite-ls` binary for the following platforms:

- macOS (Apple Silicon and Intel)
- Linux (x64 and ARM64)
- Windows (x64)

## Settings

| Setting | Description |
|---|---|
| `rite.server.path` | Absolute path to a custom `rite-ls` binary. Leave empty to use the bundled one. |
| `rite.trace.server` | Log LSP traffic to the **Rite Language Server** output channel (`off` / `messages` / `verbose`). |

Changes to `rite.server.path` restart the language server automatically; no window reload required.

Need to restart the server manually? Run **Rite: Restart Language Server** from the Command Palette.

## License

The extension code is licensed under [MIT](LICENSE).
The bundled `rite-ls` binary is part of the [Rite](https://ritely.io) project and is distributed under its own license.
