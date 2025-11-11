import { Publisher, Subjects } from "@adithya_shenal/nats";

export default class UserUnfollowedPublisher extends Publisher {
  subject = Subjects["UserUnfollowed"];
}
