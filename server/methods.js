Meteor.methods({
  'test': function() {
    console.log('Called test');
  },
  'endRoom': function(id) {
    Rooms.remove(id);
  }
});
