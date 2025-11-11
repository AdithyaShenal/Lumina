"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subjects = void 0;
var Subjects;
(function (Subjects) {
    // User Service Emits
    // User Service -> Search Service
    Subjects["UserRegistered"] = "user:registered";
    Subjects["UserUpdated"] = "user:updated";
    Subjects["UserDeleted"] = "user:deleted";
    // User Service -> Timeline Service
    Subjects["UserFollowed"] = "user:followed";
    Subjects["UserUnfollowed"] = "user:unfollow";
    // Post Service Emits
    // Post Service -> Timeline Service
    Subjects["PostCreated"] = "post:created";
    Subjects["PostUpdated"] = "post:updated";
    Subjects["PostDeleted"] = "post:deleted";
})(Subjects || (exports.Subjects = Subjects = {}));
