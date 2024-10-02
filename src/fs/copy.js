import * as fs from 'node:fs';
import * as path from 'node:path';

const handleError = (customMessage) => {
    throw new Error(customMessage || 'FS operation failed');
};

const copyFolder = (src, dest) => {
    fs.cp(src, dest, { recursive: true }, () => handleError);
}

const copy = async () => {
    const folderName = 'files_copy';
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = path.join(currentScriptDirectory, '/files');
    const newFolderDirectory = path.join(currentScriptDirectory, folderName);

    try {
        console.log(fs.existsSync(newFolderDirectory));
        if (!fs.existsSync(newFolderDirectory)) {
            copyFolder(filesDirectory, newFolderDirectory)
        }
      } catch (err) {
        handleError();
      }
};

await copy();
