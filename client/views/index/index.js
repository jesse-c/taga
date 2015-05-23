Template.index.helpers({
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

    //
    var values = {
      _workspace: this.selectedWorkspace(),
      _owner: Meteor.userId(),
      name: this.name(),
      _users: [],
      _chat: this.name()
    };
    console.log(values);

    var id = Rooms.insert(values);

    // 
    Router.go('room', { _id: id });
  }
});
