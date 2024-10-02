import * as fs from 'node:fs';
import * as path from 'node:path';

const handleError = (customMessage) => {
    throw new Error(customMessage || 'FS operation failed');
};

const writeNewFile = (pathWithName, fileContent) => {
    fs.writeFile(pathWithName, fileContent, err => {
        if (err) {
            handleError();
        }
    });
};

const readFileInDir = (filesDirectory) => {
    return new Promise((resolve, reject) => {
        return fs.readdir(filesDirectory, (err, filenames) => err != null ? reject(err) : resolve(filenames))
    })
}

const checkIfFileExists = (files, fileName) => {
    if (files.includes(fileName)) {
        handleError();
    }
};

const create = async () => {
    const fileName = 'fresh.txt';
    const fileContent = 'I am fresh and young';
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = path.join(currentScriptDirectory, '/files');
    const newFileDirectory = path.join(filesDirectory, fileName);

    try {
        const files = await readFileInDir(filesDirectory);

        checkIfFileExists(files, fileName);
        writeNewFile(newFileDirectory, fileContent);
    } catch {
        handleError();
    }
};

await create();