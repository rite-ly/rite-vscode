const { LanguageClient, TransportKind } = require('vscode-languageclient/node');
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const BINARY_NAME = process.platform === 'win32' ? 'rite-ls.exe' : 'rite-ls';

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
            BINARY_NAME
        );

        if (fs.existsSync(bundled)) {
            try {
                fs.accessSync(bundled, fs.constants.X_OK);
            } catch (_) {
                // Binary was committed without execute permission; set it now.
                fs.chmodSync(bundled, 0o755);
            }
            command = bundled;
        } else {
            vscode.window.showWarningMessage(
                `Rite: no bundled binary for ${process.platform}-${process.arch}. ` +
                `Falling back to ${BINARY_NAME} on PATH — set RITE_LS_PATH if it is not installed.`
            );
            command = BINARY_NAME;
        }
    }

    client = new LanguageClient(
        BINARY_NAME,
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
