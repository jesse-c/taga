Template['workspace__room'].viewmodel(function(data) {
  return {
    id: data._id,
    endRoom: function() {
      if (confirm("Are you sure?")) {
        Meteor.call('endRoom', this.id());
      }
    }
  };
});
