import { createWriteStream } from "node:fs";
import { join } from "node:path";

let stream;

const handleError = (customMessage) => {
    const message = customMessage || 'FS operation failed';

    throw new Error(message);
};

const handleDataInput = (data) => {
    stream.write(data);
}

const createStreamHandler = (pathToFile) => {
    stream = createWriteStream(pathToFile);
}

const write = async () => {
    const fileName = "fileToWrite.txt";
    const currentScriptDirectory = import.meta.dirname;
    const filesDirectory = join(currentScriptDirectory, "/files");
    const pathToFile = join(filesDirectory, fileName);

    createStreamHandler(pathToFile);
};

process.stdin.on("data", data => {
    if (stream) {
        handleDataInput(`${data}`);
    } else handleError();
})

await write();