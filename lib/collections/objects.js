/* Objects *******************************************************************/
Objects = new Mongo.Collection('objects');

/* Schema */
ObjectSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name of String"
  },
  // List of IDs of the rooms that use this object
  _workspaces: {
    type: [String],
    label: "Workspace IDs"
  },
  id: {
    type: String,
    label: "DOM ID"
  },
  class: {
    type: String,
    label: "DOM Class(es)",
    optional: true
  },
  /*
  style: {
    type: String,
    label: "Default style"
  },
  */
  top: {
    type: Number,
    label: "Default top position",
    optional: true
  },
  left: {
    type: Number,
    label: "Default left position",
    optional: true
  }
  // TODO Use templates instead and have the template name here?
  /*
  innerHTML: {
    type: String,
    label: "Default inner HTML"
  }
  */
});

Objects.attachSchema(ObjectSchema);

/* Object instances **********************************************************/

ObjectInstances = new Mongo.Collection('objectInstances');
if (Meteor.isServer) {
  ObjectInstancesTransient = new Mongo.Collection('objectInstancesTransient');
} else if (Meteor.isClient) {
  ObjectInstancesTransient = new Mongo.Collection('objectInstancesTransient', { connection: null });
}

/* Schema */
ObjectInstanceSchema = new SimpleSchema([
    ObjectSchema,
    {
      _object: {
        type: String,
        label: "ID of object"
      },
      // Controller
      _controller: {
        type: String,
        label: "User controlling (moving, data) the object",
        optional: true
      },
      // Room it belongs to
      _room: {
        type: String,
        label: "Room it belongs to"
      },
      // TODO Other view model props like enabled?
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
    }]
);

ObjectInstances.attachSchema(ObjectInstanceSchema);

ObjectInstanceTransientSchema = new SimpleSchema([
    ObjectInstanceSchema, 
    {
      _objectInstance: {
        type: String,
        label: "The object instance it represents"
      }
    }
]);
ObjectInstancesTransient.attachSchema(ObjectInstanceTransientSchema);

/* Helpers */
var inUsePrototype = function(item) {
  return _.isUndefined(item._controller) || item._controller == 0;
}

ObjectInstances.helpers({
  inUse: inUsePrototype(this)
});
ObjectInstancesTransient.helpers({
  inUse: inUsePrototype(this)
});
