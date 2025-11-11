import { Listener, Subjects } from "@adithya_shenal/nats";
import Follower from "../../models/follower.js";

export class UserUnfollowedListener extends Listener {
  subject = Subjects["UserUnfollowed"];
  queueGroupName = "searchService";

  async onMessage(data, message) {
    console.log("Event Data: ", data);

    try {
      const deletedFollow = await Follower.findOneAndDelete(data);

      if (!deletedFollow) {
        console.log("Error deleting follow");
      }

      console.log("Follow deleted successfully");
      message.ack();
    } catch (err) {
      console.log("Error deleting follow", err);
    }
  }
}
