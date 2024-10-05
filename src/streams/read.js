import { createReadStream } from "node:fs";
import { join } from "node:path";

const handleError = (customMessage) => {
    const message = customMessage || 'FS operation failed';

    throw new Error(message);
};

const createStreamHandler = (pathToFile) => {
    const stream = createReadStream(pathToFile, "utf8");

    stream.on("error", () => {
        handleError()
    });

    stream.on("data", (data) => {
        process.stdout.write(data + '\n');
    });

    stream.on('end', () => {
        console.log('stream ended');
    });
}

const read = async () => {
    const fileName = "fileToRead.txt";
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, "/files");
    const pathToFile = join(filesDirectory, fileName);

    createStreamHandler(pathToFile);
};

await read();
