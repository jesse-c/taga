Template.index.helpers({
});

Template.index.events({
  'click .workspace__form-start': function(e) {
    // Get name
    var name = $('#workspace__form-name').val();

    //
    var values = {
      _workspace: $('#workspace__form-workspace option:selected').val(),
      _owner: Meteor.userId(),
      name: name,
      _users: [],
      _chat: name
    };
    console.log(values);

    // TODO
    //Streamy.join(name);

    var id = Rooms.insert(values);

    // 
    Router.go('room', { _id: id });
  },
  'click .workspace__end': function(e) {
    e.preventDefault();
    
    if (confirm("Are you sure?")) {
      Meteor.call('endRoom', e.target.dataset.id);
    }
  }
});
