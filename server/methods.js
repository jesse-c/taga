Meteor.methods({
  'test': function() {
    console.log('Called test');
  },
  'endRoom': function(id) {
    Rooms.remove(id);
  },
  'lock': function(id) {
    ObjectInstances.update(id, { 
      $set: { 
        _controller: Meteor.userId()
      }
    });
  },
  'updatePosition': function(id, top, left) {
    ObjectInstances.update(id, { 
      $set: { 
        _controller: Meteor.userId(),
        top: top,
        left: left
      }
    });
  },
  'unlock': function(id, top, left) {
    ObjectInstances.update(id, { 
      $set: { 
        _controller: '',
        top: top,
        left: left
      }
    });
  }
});
