import { createServer } from "http";

let expectedFrame = 0;

const server = createServer(({ method, url, on }, res) => {
  if (method !== "POST" || url !== "/frame") {
    res.writeHead(404);
    res.end();
  }

  let body = "";

  on("data", (chunk) => {
    body += chunk.toString();
  });

  on("end", () => {
    const { frame } = JSON.parse(body);
    if (frame === expectedFrame) {
      console.log(`Receiver: Frame ${frame} received correctly.`);
      expectedFrame = (expectedFrame + 1) % 2;
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify({ acknowledgement: frame }));
    } else {
      console.log(
        `Receiver : Duplicate frame ${frame} received. It will be discarded.`
      );
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ acknowledgement: expectedFrame === 0 ? 1 : 0 }));
    }
  });
});

server.listen(3000, () => {
  console.log("Receiver is running on http://localhost:3000");
});
