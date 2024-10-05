import { existsSync, readFile } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto'

const handleError = (customMessage) => {
    const message = customMessage || 'FS operation failed';

    throw new Error(message);
};

const calcHash = (content) => {
    const result = createHash('sha256').update(content).digest('hex');

    console.log(result);
};

const readFileHandler = (err, data) => {
    if (err) {
        handleError();
    }

    calcHash(data);
  };

const calculateHash = async () => {
    const fileName = 'fileToCalculateHashFor.txt';
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

await calculateHash();