Rooms = new Mongo.Collection('rooms');

var maxUsersCount = 5;

/* Schema */
RoomSchema = new SimpleSchema({
  _workspace: {
    type: String,
    label: "Workspace ID",
    max: 255
  },
  _owner: {
    type: String,
    label: "Owner ID",
    max: 255
  },
  name: {
    type: String,
    label: "Room name",
    max: 255
  },
  // List of IDs of the users currently in this room
  _users: {
    type: [String],
    label: "Current user IDs",
    maxCount: maxUsersCount
  },
  // TODO Chat
  // Force value to be current date (on server) upon insert and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  // Force value to be current date (on server) upon update and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Rooms.attachSchema(RoomSchema);

/* Helpers */
Rooms.helpers({
  userCount: function() {
    return this._users.length;
  },
  maxUsersCount: function() {
    return maxUsersCount;
  }
});
