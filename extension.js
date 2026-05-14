const { LanguageClient, TransportKind } = require('vscode-languageclient/node');
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const BINARY_NAME = process.platform === 'win32' ? 'rite-ls.exe' : 'rite-ls';

let client;

function resolveCommand(context) {
    const configured = vscode.workspace.getConfiguration('rite').get('server.path');
    if (configured) {
        return configured;
    }

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
        return bundled;
    }

    vscode.window.showWarningMessage(
        `Rite: no bundled binary for ${process.platform}-${process.arch}. ` +
        `Falling back to ${BINARY_NAME} on PATH, set rite.server.path if it is not installed.`
    );
    return BINARY_NAME;
}

function startClient(context) {
    const command = resolveCommand(context);
    client = new LanguageClient(
        'rite',
        'Rite Language Server',
        { command, transport: TransportKind.stdio },
        { documentSelector: [{ scheme: 'file', language: 'yaml', pattern: '**/*.rite.yaml' }] }
    );
    client.start();
}

async function restart(context) {
    await client?.stop();
    startClient(context);
}

function activate(context) {
    startClient(context);

    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('rite.server.path')) {
                restart(context);
            }
        }),
        vscode.commands.registerCommand('rite.restartServer', () => restart(context))
    );
}

function deactivate() {
    return client?.stop();
}

module.exports = { activate, deactivate };
