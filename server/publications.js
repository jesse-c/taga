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

// TODO Find all the objects that the workspace uses
Meteor.publish('objects', function(workspaceId) {
  // return Objects.find({ _workspaces: workspaceId });
  return Objects.find();
});

Meteor.publish('objectInstances', function(roomId) {
  return ObjectInstances.find({ _room: roomId });
});

Meteor.publish('objectInstancesTransient', function(roomId) {
  return ObjectInstancesTransient.find({ _room: roomId });
});

Meteor.publish('#r', function() {
  return R.find({}, {limit: 1});
});

Meteor.publish('#g', function() {
  return G.find({}, { limit: 1 });
});

Meteor.publish('#b', function() {
  return B.find({}, { limit: 1 });
});

Meteor.publish('sensor', function() {
  return Sensor.find({}, { limit: 1 });
});

Meteor.publish('chat', function(roomId) {
  return Chat.find({ _room: roomId });
});
