# Changelog

All notable changes to the Rite Language extension are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [0.1.3] - 2026-08-29

### Changed

- Updated the bundled `rite-ls` language server to 0.5.0. Ceremony files get diagnostics, hover, and completions for the `sign_data` and `verify_signature` steps, and a reference to an unknown namespace is now reported as an error.

## [0.1.2] - 2026-07-02

### Changed

- Updated the bundled `rite-ls` language server to 0.3.1.

## [0.1.1] - 2026-05-30

### Changed

- Updated the bundled `rite-ls` language server to 0.2.1.
- Disabled the Q&A tab on the Marketplace listing.

### Fixed

- The extension icon now renders on a white background instead of a transparent one.

## [0.1.0] - 2026-05-15

### Added

- Initial release.
- Language support for `*.rite.yaml` ceremony files via the bundled `rite-ls` language server: diagnostics, hover information, and completions.
- Bundled binaries for macOS (Apple Silicon and Intel), Linux (x64 and ARM64), and Windows (x64).
- `rite.server.path` setting to point at a custom `rite-ls` binary (hot-restarts the server on change).
- `rite.trace.server` setting to log LSP traffic to the **Rite Language Server** output channel.
- **Rite: Restart Language Server** command.

[0.1.3]: https://github.com/rite-ly/rite-vscode/releases/tag/v0.1.3
[0.1.2]: https://github.com/rite-ly/rite-vscode/releases/tag/v0.1.2
[0.1.1]: https://github.com/rite-ly/rite-vscode/releases/tag/v0.1.1
[0.1.0]: https://github.com/rite-ly/rite-vscode/releases/tag/v0.1.0
