# Rite VS Code Extension

> **Alpha release** — this extension is in early development. Expect rough edges and breaking changes.

VS Code extension providing language support for `.rite.yaml` ceremony files, powered by the `rite-ls` language server.

## Features

- Diagnostics (errors and warnings)
- Hover information
- Completions

## Requirements

The extension ships with a bundled `rite-ls` binary for the following platforms:

- macOS (Apple Silicon and Intel)
- Linux (x64 and ARM64)

No installation required on supported platforms — the binary is included in the extension.

> Windows is not yet supported.

## Configuration

To use a custom or locally built `rite-ls` binary, set the `RITE_LS_PATH` environment variable to its path before launching VS Code.

## Development

Clone the repository and open it in VS Code. Press **F5** to launch an Extension Development Host with the plugin loaded.

Set `RITE_LS_PATH` in your environment (or in `.vscode/launch.json` under `env`) to point to a local build of `rite-ls`.

## License

The extension code is licensed under [MIT](LICENSE).
The bundled `rite-ls` binary is part of the [Rite](https://ritely.io) project and is distributed under its own license.
