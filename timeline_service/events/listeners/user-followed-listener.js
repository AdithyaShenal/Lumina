import { Listener, Subjects } from "@adithya_shenal/nats";
import Follower from "../../models/follower.js";

export class UserFollowedListener extends Listener {
  subject = Subjects["UserFollowed"];
  queueGroupName = "timelineService";

  async onMessage(data, message) {
    console.log("Event Data: ", data);

    try {
      const follower = new Follower(data);
      await follower.save();
      console.log("Follower saved successfull");
      message.ack();
    } catch (err) {
      if (err.code === 11000) {
        console.log("Duplicate follower detected - skipping save");
        message.ack();
      } else {
        console.log("Error saving follower:", err.message);
      }
    }
  }
}
