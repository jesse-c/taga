Meteor.publish('workspaces', function() {
  return Workspaces.find();
});

Meteor.publish('workspace', function(workspaceId) {
  return Workspaces.find(workspaceId);
});

Meteor.publish('rooms', function() {
  return Rooms.find();
});

Meteor.publish('room', function(roomId) {
  return Rooms.find(roomId);
});
