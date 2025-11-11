import { Stan, Message } from "node-nats-streaming";

export abstract class Listener {
  private stan: Stan;
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, message: Message): void;
  protected ackWait = 5 * 1000;

  constructor(stan: Stan) {
    this.stan = stan;
  }

  subscriptionOptions(): any {
    return this.stan
      .subscriptionOptions()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.stan.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (message: Message) => {
      console.log(`Message Received: ${this.subject} | ${this.queueGroupName}`);

      const parsedData = this.parseMessage(message);
      this.onMessage(parsedData, message);
    });
  }

  parseMessage(message: Message) {
    const data = message.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
