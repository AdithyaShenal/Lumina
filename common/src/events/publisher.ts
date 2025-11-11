import { Stan } from "node-nats-streaming";

export abstract class Publisher<T> {
  private stan: Stan;
  abstract subject: string;

  constructor(stan: Stan) {
    this.stan = stan;
  }

  publish(data: any) {
    this.stan.publish(this.subject, JSON.stringify(data), (err) => {
      console.log(err);
    });

    console.log("Event published to subject:", this.subject);
    console.log("Published Data: ", data);
  }
}
