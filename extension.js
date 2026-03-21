const { LanguageClient, TransportKind } = require('vscode-languageclient/node');
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let client;

function activate(context) {
    let command;

    if (process.env.RITE_LS_PATH) {
        command = process.env.RITE_LS_PATH;
    } else {
        const bundled = path.join(
            context.extensionPath,
            'bin',
            `${process.platform}-${process.arch}`,
            'rite-ls'
        );

        if (fs.existsSync(bundled)) {
            try {
                fs.chmodSync(bundled, 0o755);
            } catch (_) {
                // Ignore on file systems without POSIX permission support.
            }
            command = bundled;
        } else {
            vscode.window.showWarningMessage(
                'Rite: no bundled binary found for this platform ' +
                `(${process.platform}-${process.arch}). ` +
                'Falling back to rite-ls on PATH. ' +
                'Set RITE_LS_PATH to point to the binary if this fails.'
            );
            command = 'rite-ls';
        }
    }

    client = new LanguageClient(
        'rite-ls',
        'Rite Language Server',
        { command, transport: TransportKind.stdio },
        { documentSelector: [{ scheme: 'file', language: 'yaml' }] }
    );
    client.start();
}

function deactivate() {
    return client?.stop();
}

module.exports = { activate, deactivate };
