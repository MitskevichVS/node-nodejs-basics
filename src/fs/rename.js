import { existsSync, rename as renameFile } from 'node:fs';
import { join } from 'node:path';

const handleError = (customMessage) => {
    const message = customMessage || 'FS operation failed';

    throw new Error(message);
};

const rename = async () => {
    const fileName = 'wrongFilename.txt';
    const newFileName = 'properFilename.md';
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, '/files');
    const pathToFile = join(filesDirectory, fileName);
    const pathToNewFile = join(filesDirectory, newFileName);

    try {
        if (existsSync(pathToFile) && !existsSync(pathToNewFile)) {
            renameFile(pathToFile, pathToNewFile, (err) => {
                if (err) {
                    handleError()
                };
            });
        } else {
            handleError();
        }
      } catch (err) {
        handleError();
      }
};

await rename();