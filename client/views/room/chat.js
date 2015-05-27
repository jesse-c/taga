Template['chat'].helpers({
  users: function(room) {
    return Meteor.users.find({ _id: { $in:  room._users }});
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
      message: $('#room__chat__message').val()
    });

    $('#room__chat__message').val('');
  }
});
