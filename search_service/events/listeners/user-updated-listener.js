import { Listener, Subjects } from "@adithya_shenal/nats";
import User from "../../models/user.js";

export class UserUpdatedListener extends Listener {
  subject = Subjects["UserUpdated"];
  queueGroupName = "searchService";

  async onMessage(data, message) {
    console.log("Event Data: ", data);

    const { _id, ...updates } = data;

    try {
      const user = await User.findByIdAndUpdate(
        data._id,
        {
          $set: updates,
        },
        { new: true }
      );

      console.log("User update successfull: ", user);
    } catch (err) {
      console.log("Error updating user:", err);
    }

    message.ack();
  }
}
