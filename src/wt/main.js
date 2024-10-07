import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import { join } from "node:path";

const performCalculations = async () => {
    const cpuCount = cpus().length;

    const workerThreads = [];

    for (let i = 0; i < cpuCount; i++) {
      workerThreads.push(
        new Promise((resolve, reject) => {
            const worker = new Worker(join(import.meta.dirname, 'worker.js'));

            worker.postMessage({ number: 10 + i });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
              if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        }));
    };

    Promise.allSettled(workerThreads).then((data) => {
        const result = data.map(({status, value}) => ({data: value, status: status === 'fulfilled' ? 'resolved' : 'error'}))
        console.log('workerThreads', result);
    })
};

await performCalculations();