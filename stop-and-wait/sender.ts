let sequenceNumber = 0;
const receiverUrl = "http://localhost:3000/frame";
const timeoutDuration = 3000;
let awaitingAck = false;

const sendFrame = async () => {
  if (awaitingAck) return;

  console.log(`Sender: Sending frame with sequence number ${sequenceNumber}`);
  awaitingAck = true;

  try {
    const response = await fetch(receiverUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ frame: sequenceNumber }),
    });

    if (response.ok) {
      const { ack } = await response.json();
    }
  } catch (error) {}
};
