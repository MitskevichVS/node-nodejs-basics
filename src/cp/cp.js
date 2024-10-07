import { spawn } from 'node:child_process';
import { join } from 'node:path';

const spawnChildProcess = async (args = []) => {
    const fileName = 'script.js';
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, '/files');
    const scriptDirectory = join(filesDirectory, fileName);

    const child = spawn('node', [scriptDirectory, ...args]);

    child.stdin.write('Message from parent\n');

    child.stdout.on('data', (data) => {
        console.log(`Parent received: ${data}`);
    });

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
