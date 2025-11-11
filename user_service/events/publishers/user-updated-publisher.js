import { Publisher, Subjects } from "@adithya_shenal/nats";

export default class UserUpdatedPublisher extends Publisher {
  subject = Subjects["UserUpdated"];
}
