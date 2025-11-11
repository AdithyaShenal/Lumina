export enum Subjects {
  // User Service Emits
  // User Service -> Search Service
  UserRegistered = "user:registered",
  UserUpdated = "user:updated",
  UserDeleted = "user:deleted",
  // User Service -> Timeline Service
  UserFollowed = "user:followed",
  UserUnfollowed = "user:unfollow",

  // Post Service Emits
  // Post Service -> Timeline Service
  PostCreated = "post:created",
  PostUpdated = "post:updated",
  PostDeleted = "post:deleted",
}
