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
    console.log(values);

    var id = Rooms.insert(values);

    // TODO TEST Add the room to the workspace's list
    Workspaces.update(values._workspace, { $push: { _rooms: id }});

    // TODO Setup the room
    // TODO Show waiting for setup message
    // TODO Go to room once it's ready
    // Router.go('room', { _id: id });
  }
});
