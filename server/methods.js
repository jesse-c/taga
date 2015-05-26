Meteor.methods({
  'test': function() {
    console.log('Called test');
  },
  'readSensor': function(r, g, b) {
    console.log('Called readSensor');
    console.log(r, g, b);
    Sensor.update(Sensor.find()._id, {
      $set: {
        r: r,
        g: g,
        b: b
      }
    });
    //return "test";
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
