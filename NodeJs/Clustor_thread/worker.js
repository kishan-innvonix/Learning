import { parentPort } from "worker_threads"

function heavyTask(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    count += Math.sqrt(i); // simulate CPU work
  }
  return count;
}

parentPort.on("message", (n) => {
  const result = heavyTask(n);
  parentPort.postMessage(result);
});