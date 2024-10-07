import { createReadStream, createWriteStream } from "node:fs";
import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { join } from "node:path";

const decompress = async () => {
    const archiveName = "archive.gz";
    const newFileName = "newFileToCompress.txt";
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, "/files");
    const pathToNewFile = join(filesDirectory, newFileName);
    const pathToArchive = join(currentScriptDirectory, archiveName);

    const unzip = createUnzip();
    const source = createReadStream(pathToArchive);
    const destination = createWriteStream(pathToNewFile);

    pipeline(source, unzip, destination, (err) => {
        if (err) {
          console.error('An error occurred:', err);
          process.exitCode = 1;
        }
      });
};

await decompress();