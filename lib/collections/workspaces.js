Workspaces = new Mongo.Collection('workspaces');

/* Schema */
WorkspaceSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Workspace name",
    max: 255
  },
  description: {
    type: String,
    label: "Workspace description"
  },
  // List of IDs of the rooms based on this workspace
  _rooms: {
    type: [String],
    label: "Room IDs"
  },
  // Data sources
  _dataSources: {
    type: [String],
    label: "Data source IDs"
  },
  // Objects
  _objects: {
    type: [String],
    label: "Object IDs"
  },
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

Workspaces.attachSchema(WorkspaceSchema);

/* Helpers */
Workspaces.helpers({
  // Return number of attached rooms
  roomsCount: function() {
    return this._rooms.length;
  },
  // Return an array of rooms (documents)
  rooms: function() {
    return Rooms.find({_workspace: this._id});
  }
});
