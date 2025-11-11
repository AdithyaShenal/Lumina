import { Publisher, Subjects } from "@adithya_shenal/nats";

export default class UserDeletedPublisher extends Publisher {
  subject = Subjects["UserDeleted"];
}
