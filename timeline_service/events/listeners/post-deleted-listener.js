import { Listener, Subjects } from "@adithya_shenal/nats";
import Timeline from "../../models/timeline.js";

export class PostDeletedListener extends Listener {
  subject = Subjects["PostDeleted"];
  queueGroupName = "PostDeleted";

  async onMessage(data, message) {
    console.log("Event Data: ", data); // Debug

    try {
      // Update all documents that match
      const result = await Timeline.updateMany(
        {},
        {
          // $pull - rm items from array that matches the post_id
          $pull: { posts: { post_id: data.post_id } },
        }
      );
      console.log(
        `Post ${data.post_id} removed from ${result.modifiedCount} timelines.`
      ); // Debug
      message.ack();
    } catch (err) {
      console.error("Error removing post from timelines:", err.message); // Debug
    }
  }
}
