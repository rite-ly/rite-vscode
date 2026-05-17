#!/usr/bin/env bash
# Download rite-ls binaries into bin/ from rite-ly/rite GitHub Releases.
#
# Usage:
#   ./scripts/download-rite-ls.sh VERSION

set -euo pipefail

REPO="rite-ly/rite"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "${SCRIPT_DIR}")"
TMP_DIR="$(mktemp -d)"

cleanup() { rm -rf "${TMP_DIR}"; }
trap cleanup EXIT

VERSION="${1:?Usage: $0 VERSION}"

echo "Downloading rite-ls v${VERSION} from GitHub Releases..."

place() {
    local rite_target="$1"
    local dest_rel="$2"
    local dest="${REPO_DIR}/${dest_rel}"
    local release_file="rite-ls-${VERSION}-${rite_target}"
    [[ "${dest_rel}" == *.exe ]] && release_file="${release_file}.exe"
    local src="${TMP_DIR}/${release_file}"
    local url="https://github.com/${REPO}/releases/download/v${VERSION}/${release_file}"

    curl -fsSL -o "${src}" "${url}"
    mkdir -p "$(dirname "${dest}")"
    cp "${src}" "${dest}"
    chmod 755 "${dest}"
    echo "  rite-ls-${rite_target} -> ${dest_rel}"
}

place "darwin-arm64"     "bin/darwin-arm64/rite-ls"
place "darwin-amd64"     "bin/darwin-x64/rite-ls"
place "linux-arm64"      "bin/linux-arm64/rite-ls"
place "linux-amd64"      "bin/linux-x64/rite-ls"
place "windows-amd64"    "bin/win32-x64/rite-ls.exe"

echo "Done."
