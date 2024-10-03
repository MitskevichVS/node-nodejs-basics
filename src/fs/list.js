import { readdir } from 'node:fs';
import { join } from 'node:path';

const handleError = (customMessage) => {
    const message = customMessage || 'FS operation failed';

    throw new Error(message);
};

const readFileInDir = (filesDirectory) => {
    return new Promise((resolve, reject) => {
        return readdir(filesDirectory, (err, filenames) => {
            if (err) {
                reject(err);
            } else resolve(filenames);
        })
    })
}

const list = async () => {
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, '/files');

    try {
        const files = await readFileInDir(filesDirectory);

        console.log(files);
    } catch {
        handleError();
    }
};

await list();