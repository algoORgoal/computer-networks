import { createServer } from "http";

let expectedSeq = 0;

const server = createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/frame") {
    res.writeHead(404);
    res.end();
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { seq } = JSON.parse(body);
    if (seq === expectedSeq) {
      console.log(`Receiver received frame with SEQ ${seq}.`);
      expectedSeq = (expectedSeq + 1) % 2;
      res.writeHead(200, {
        "content-type": "application/json",
      });

      await new Promise((resolve) => {
        console.log("Processing...");
        setTimeout(resolve, 3000);
      });

      console.log(`Receiver sent ACK ${expectedSeq}`);

      res.end(JSON.stringify({ ack: expectedSeq }));
    } else {
      console.log(
        `Receiver received duplicate frame with SEQ ${seq}. It will be discarded.`
      );
      res.writeHead(200, { "content-type": "application/json" });

      await new Promise((resolve) => {
        console.log("Processing...");
        setTimeout(resolve, 3000);
      });
      console.log(`Receiver sent ACK ${expectedSeq}`);
      res.end(JSON.stringify({ ack: expectedSeq }));
    }
  });
});

server.listen(3000, () => {
  console.log("Receiver is running on http://localhost:3000");
});
