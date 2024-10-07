import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { join } from "node:path";

const compress = async () => {
    const fileName = "fileToCompress.txt";
    const archiveName = 'archive.gz';
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, "/files");
    const pathToFile = join(filesDirectory, fileName);
    const archiveDestination = join(currentScriptDirectory, archiveName);

    const gzip = createGzip();
    const source = createReadStream(pathToFile);
    const destination = createWriteStream(archiveDestination);

    pipeline(source, gzip, destination, (err) => {
        if (err) {
            console.error('An error occurred:', err);
            process.exitCode = 1;
        }
  });
};

await compress();