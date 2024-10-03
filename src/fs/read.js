import { existsSync, readFile } from 'node:fs';
import { join } from 'node:path';

const handleError = (customMessage) => {
    const message = customMessage || 'FS operation failed';

    throw new Error(message);
};

const readFileHandler = (err, data) => {
    if (err) {
        handleError();
    }

    console.log(data);
  };

const read = async () => {
    const fileName = 'fileToRead.txt';
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, '/files');
    const pathToFile = join(filesDirectory, fileName);

    try {
        if (existsSync(pathToFile)) {
            readFile(pathToFile, 'utf8', readFileHandler);
        } else {
            handleError();
        }
      } catch (err) {
        handleError();
      }
};

await read();