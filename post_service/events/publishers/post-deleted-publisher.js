import { Publisher, Subjects } from "@adithya_shenal/nats";

export default class PostDeletedPublisher extends Publisher {
  subject = Subjects["PostDeleted"];
}
