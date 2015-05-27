Template.index.helpers({
  _roomsData: function(workspaceId) {
    return Rooms.find({ _workspace: workspaceId});
  }
});

Template.index.events({
});

Template.index.viewmodel({
  name: '',
  selectedWorkspace: '',
  hasName: function() {
    return !!this.name();
  },
  startRoom: function() {
    // TODO Create chat room


    //
    var values = {
      _workspace: this.selectedWorkspace(),
      _owner: Meteor.userId(),
      name: this.name(),
      _users: [],
      chat: this.name()
    };

    var id = Rooms.insert(values);

    // Add the room to the workspace's list
    Workspaces.update(values._workspace, { $push: { _rooms: id }});

    // TODO Show waiting for setup message
    // TODO Setup the room - should do server side
    // Make copies of the Objects for this workspace in ObjectInstances
    var objs = Objects.find({}, { _workspaces: values._workspace });
    objs.forEach(function (doc) {
      doc._object = doc._id;
      delete doc._id;
      doc._room = id; 

      ObjectInstances.insert(doc);
    });

    var ds = DataSources.find({}, { _workspaces: values._workspace });
    ds.forEach(function (doc) {
      doc._dataSource = doc._id;
      delete doc._id;
      doc._room = id; 

      DataSourceInstances.insert(doc);
    });
    
    // Go to room once it's ready
    Router.go('room', { _id: id });
  }
});
