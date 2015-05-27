Template['chat'].helpers({
  users: function() {
    return Meteor.users.find();
  },
  findUsername: function(id) {
    return Meteor.users.findOne(id).username;
  },
  messages: function() {
    return Chat.find({}, { sort: { createdAt: 1 }});
  }
});

Template['chat'].events({
  'click input[type="submit"]': function (e) {
    e.preventDefault();

    Chat.insert({
      _room: Rooms.findOne()._id,
      _user: Meteor.userId(),
      username: Meteor.user().username,
      message: $('#room__chat__message').val()
    });

    $('#room__chat__message').val('');
  }
});
