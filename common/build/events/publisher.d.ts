import { Stan } from "node-nats-streaming";
export declare abstract class Publisher<T> {
    private stan;
    abstract subject: string;
    constructor(stan: Stan);
    publish(data: any): void;
}
