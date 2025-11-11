import nats from "node-nats-streaming";

class NatsClient {
  constructor() {
    this.stan = null;
  }

  get client() {
    if (!this.stan)
      throw new Error("Cannot access NATS client before connecting");

    return this.stan;
  }

  connect(clusterid, clientId, url) {
    this.stan = nats.connect(clusterid, clientId, { url });

    return new Promise((resolve, reject) => {
      this.stan.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });

      this.stan.on("error", (err) => {
        console.error(err);
        reject(err);
      });
    });
  }
}

export const natsClient = new NatsClient();
