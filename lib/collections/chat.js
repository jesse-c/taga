Chat = new Mongo.Collection('chat');

/* Schema */
ChatSchema = new SimpleSchema({
  _room: {
    type: String,
    label: 'The room this belongs to'
  },
  _user: {
    type: String,
    label: 'User who sent this message'
  },
  message: {
    type: String,
    label: 'Message'
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

Chat.attachSchema(ChatSchema);
