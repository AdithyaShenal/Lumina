import { Publisher, Subjects } from "@adithya_shenal/nats";

export default class UserRegisteredPublisher extends Publisher {
  subject = Subjects["UserRegistered"];
}
