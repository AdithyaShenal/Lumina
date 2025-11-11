import { Stan, Message } from "node-nats-streaming";
export declare abstract class Listener {
    private stan;
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, message: Message): void;
    protected ackWait: number;
    constructor(stan: Stan);
    subscriptionOptions(): any;
    listen(): void;
    parseMessage(message: Message): any;
}
