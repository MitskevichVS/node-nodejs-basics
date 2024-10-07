import { Transform } from "node:stream";

const reverseHandler = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, `${chunk}`.split('').reverse().join(''));
    },
  });

  
  const transform = async () => {
    process.stdin.pipe(reverseHandler).pipe(process.stdout);
};

await transform();