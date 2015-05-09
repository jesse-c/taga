Meteor.publish('workspaces', function() {
  return Workspaces.find()
});

Meteor.publish('rooms', function() {
  return Roomss.find()
});
