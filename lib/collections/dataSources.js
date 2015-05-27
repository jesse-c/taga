/* Data sources **************************************************************/
DataSources = new Mongo.Collection('dataSources');

/* Schema */
DataSourceSchema = new SimpleSchema({
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

DataSources.attachSchema(DataSourceSchema);

/* DataSource instances **********************************************************/

DataSourceInstances = new Mongo.Collection('dataSourceInstances');
if (Meteor.isServer) {
  DataSourceInstancesTransient = new Mongo.Collection('dataSourceInstancesTransient');
} else if (Meteor.isClient) {
  DataSourceInstancesTransient = new Mongo.Collection('dataSourceInstancesTransient', { connection: null });
}

/* Schema */
DataSourceInstanceSchema = new SimpleSchema([
    DataSourceSchema,
    {
      _dataSource: {
        type: String,
        label: "ID of data source"
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

DataSourceInstances.attachSchema(DataSourceInstanceSchema);

DataSourceInstanceTransientSchema = new SimpleSchema([
    DataSourceInstanceSchema, 
    {
      _objectInstance: {
        type: String,
        label: "The object instance it represents"
      }
    }
]);
DataSourceInstancesTransient.attachSchema(DataSourceInstanceTransientSchema);

/* Helpers */
var inUsePrototype = function(item) {
  if (_.isUndefined(item._controller)) {
    return false;   
  } else if (!item._controller.length == 0) {
    return true;
  }
}

DataSourceInstances.helpers({
  inUse: inUsePrototype(this)
});
DataSourceInstancesTransient.helpers({
  inUse: inUsePrototype(this)
});
