let seq = 0;
const receiverUrl = "http://localhost:3000/frame";
const timeoutDuration = 3000;
let awaitingAck = false;

const sendFrame = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (awaitingAck) return;

  console.log(`Sender sent frame with SEQ ${seq}`);
  awaitingAck = true;

  try {
    const response = await fetch(receiverUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ seq }),
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (response.ok) {
      const { ack } = await response.json();
      console.log(`Sender received ACK ${ack}`);
      awaitingAck = false;
      seq = ack;
    }
  } catch (error) {}
};

setInterval(sendFrame, timeoutDuration);

sendFrame();
