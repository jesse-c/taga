Template['workspace__room'].viewmodel(function(data) {
  return {
    _id: data._id,
    _workspace: data._workspace, 
    endRoom: function() {
      if (confirm("Are you sure?")) {
        Meteor.call('endRoom', this._id());

        // TODO [Works but throws error] Add the room to the workspace's list
        Workspaces.update({ _id: this._workspace }, { $pull: { _rooms: this._id() }});
      }
    }
  };
});
