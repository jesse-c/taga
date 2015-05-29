Meteor.methods({
  'test': function() {
    console.log('Called test');
  },
  'updateStatus': function(newStatus) {
    Rooms.update(Rooms.findOne()._id, { $set: { status: newStatus }});
  },
  'readSensor': function(r, g, b) {
    function convertRange( value, r1, r2 ) { 
          return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
    }

    r = Math.floor(convertRange(r, [0, 5000], [0, 255]));
    g = Math.floor(convertRange(g, [0, 5000], [0, 255]));
    b = Math.floor(convertRange(b, [0, 5000], [0, 255]));

    console.log('Called readSensor');
    console.log(r, g, b);
    Sensor.update(Sensor.findOne(), {
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
    // TODO Remove instances
    ObjectInstances.remove({}, { _room: id });
    DataSourceInstances.remove({}, { _room: id });
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
