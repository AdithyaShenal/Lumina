import { Listener, Subjects } from "@adithya_shenal/nats";
import Timeline from "../../models/timeline.js";
import Follower from "../../models/follower.js";

export class PostCreatedListener extends Listener {
  subject = Subjects["PostCreated"];
  queueGroupName = "PostCreated";

  async onMessage(data, message) {
    console.log("Event Data: ", data); // Debug

    try {
      // find all followed that user
      const followers = await Follower.find({ target_user_id: data.user_id });

      if (followers.length === 0) {
        message.ack();
        return;
      }

      // update time line of each follower (put that post top of the timeline)
      for (const follower of followers) {
        await Timeline.updateOne(
          { user_id: follower.user_id },
          {
            $push: {
              posts: {
                $each: [
                  {
                    post_id: data.post_id,
                    user_id: data.user_id,
                    image_url: data.image_url,
                    image_name: data.image_name,
                    time_stamp: new Date(data.time_stamp),
                    caption: data.caption,
                    location: data.location,
                    post_type: data.post_type,
                  },
                ],
                $position: 0,
              },
            },
          },
          { upsert: true }
        );
      }

      message.ack();
      console.log("Timeline updating complete.");
    } catch (err) {
      console.log("Error occured updating timeline: ", err.message);
    }
  }
}
