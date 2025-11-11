"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
class Publisher {
    stan;
    constructor(stan) {
        this.stan = stan;
    }
    publish(data) {
        this.stan.publish(this.subject, JSON.stringify(data), (err) => {
            console.log(err);
        });
        console.log("Event published to subject:", this.subject);
        console.log("Published Data: ", data);
    }
}
exports.Publisher = Publisher;
