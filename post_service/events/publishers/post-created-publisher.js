import { Publisher, Subjects } from "@adithya_shenal/nats";

export default class PostCreatedPublisher extends Publisher {
  subject = Subjects["PostCreated"];
}
