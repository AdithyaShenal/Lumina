import { Publisher, Subjects } from "@adithya_shenal/nats";

export default class UserFollowedPublisher extends Publisher {
  subject = Subjects["UserFollowed"];
}
