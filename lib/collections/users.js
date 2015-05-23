Meteor.users.find({ "status.online": true }).observe({
  added: function(user) {
    // user just came online
  },
  removed: function(user) {
    // user just went offline
    // Remove them from any rooms they were in
    Rooms.update({ _users: user._id }, { $pull: { _users: user._id }});
  }
});
