import { Listener, Subjects } from "@adithya_shenal/nats";
import User from "../../models/user.js";

export class UserDeletedListener extends Listener {
  subject = Subjects["UserDeleted"];
  queueGroupName = "searchService";

  async onMessage(data, message) {
    console.log("Event Data: ", data);

    try {
      const user = await User.findByIdAndDelete(data._id);
      if (!user) {
        console.log("User delete failed: not found.");
      }

      console.log("User deleted successfully");
      message.ack();
    } catch (err) {
      console.log("Error deleteing user: ", err.message);
    }
  }
}
