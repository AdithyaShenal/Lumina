import { Listener, Subjects } from "@adithya_shenal/nats";
import User from "../../models/user.js";

//  Lsitener checked successfully

export class UserRegisteredListener extends Listener {
  subject = Subjects["UserRegistered"];
  queueGroupName = "searchService";

  async onMessage(data, message) {
    console.log("Event Data: ", data); // Debug

    try {
      const user = new User(data);
      user.isNew = true;
      await user.save({ timestamps: false });
      console.log("Event Replicated Successfully"); // Debug
    } catch (err) {
      console.log("Error Registering User: ", err);
    }

    message.ack();
  }
}
