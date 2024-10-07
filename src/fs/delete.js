import { existsSync, unlink } from 'node:fs';
import { join } from 'node:path';

const handleError = (customMessage) => {
    throw new Error(customMessage || 'FS operation failed');
};

const deleteFile = (path) => {
    unlink(path, (err) => {
        if (err) { handleError() };
    });
};

const remove = async () => {
    const fileName = 'fileToRemove.txt';
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, '/files');
    const fileToDeletePath = join(filesDirectory, fileName);

    try {
        if (existsSync(fileToDeletePath)) {
            deleteFile(fileToDeletePath);
        } else {
            handleError();
        }
      } catch (err) {
        handleError();
      }
};

await remove();