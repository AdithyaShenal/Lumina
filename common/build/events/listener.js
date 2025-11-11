"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    stan;
    ackWait = 5 * 1000;
    constructor(stan) {
        this.stan = stan;
    }
    subscriptionOptions() {
        return this.stan
            .subscriptionOptions()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subscription = this.stan.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on("message", (message) => {
            console.log(`Message Received: ${this.subject} | ${this.queueGroupName}`);
            const parsedData = this.parseMessage(message);
            this.onMessage(parsedData, message);
        });
    }
    parseMessage(message) {
        const data = message.getData();
        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf8"));
    }
}
exports.Listener = Listener;
