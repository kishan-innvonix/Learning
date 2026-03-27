import { Worker } from "worker_threads";
const pool = [];

const POOL_SIZE = 4;

for (let i = 0; i < POOL_SIZE; i++) {
  pool.push(new Worker(new URL("./worker.js", import.meta.url)));
}

let index = 0;

function runTask(data) {
  return new Promise((resolve, reject) => {
    const worker = pool[index];
    index = (index + 1) % POOL_SIZE;

    worker.once("message", resolve);
    worker.once("error", reject);

    worker.postMessage(data);
  });
}

export default runTask;