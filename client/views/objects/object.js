    /*
Template['workspace__object'].helpers({
});

Template['workspace__object'].viewmodel(function(data) {
  return {
    _id: data._id,
    top: data.top,
    left: data.left,
    domId: data.id
    styleText: function() {
      return 'top: '  + this.top() + '; left: ' + this.left() + ';';
    }
  };
});
    */

Template['object__pwm_input'].helpers({
  r: function() {
    return R.findOne().value;
  },
  g: function() {
    return G.findOne().value;
  },
  b: function() {
    return B.findOne().value;
  },
  objectLink: function(id) {
    var room = Rooms.findOne();
    return '/room/' + room._id + '/object/' + id;
  }
});

Template['object__pwm_input'].events({
  'focus #input-r': function() {
    // TODO Update controller
  },
  'change #input-r': function() {
    R.update(R.findOne()._id, { $set: { value: $('#input-r').val() }});
  },
  'change #input-g': function() {
    G.update(G.findOne()._id, { $set: { value: $('#input-g').val() }});
  },
  'change #input-b': function() {
    B.update(B.findOne()._id, { $set: { value: $('#input-b').val() }});
  },
  'click #pwm_input__submit, submit form': function(e) {
    e.preventDefault();

    var newR = $('#input-r').val();
    var newG = $('#input-g').val();
    var newB = $('#input-b').val();

    R.update(R.findOne()._id, { $set: { value: newR } });
    G.update(G.findOne()._id, { $set: { value: newG } });
    B.update(B.findOne()._id, { $set: { value: newB } });

    Submitted.insert({
      r: newR,
      g: newG,
      b: newB,
      shown: false
    });

    Meteor.call('updateStatus', 'Submitted PWM values');

    // TODO ? Tell the Arduino it's ready
  }
});

Template['object__pwm_input_mobile'].helpers({
  r: function() {
    return R.findOne().value;
  },
  g: function() {
    return G.findOne().value;
  },
  b: function() {
    return B.findOne().value;
  }
});

Template['object__pwm_input_mobile'].events({
  'focus #input-r': function() {
    // TODO Update controller
  },
  'change #input-r': function() {
    R.update(R.findOne()._id, { $set: { value: $('#input-r').val() }});
  },
  'change #input-g': function() {
    G.update(G.findOne()._id, { $set: { value: $('#input-g').val() }});
  },
  'change #input-b': function() {
    B.update(B.findOne()._id, { $set: { value: $('#input-b').val() }});
  },
  'click #pwm_input__submit, submit form': function(e) {
    e.preventDefault();

    var newR = $('#input-r').val();
    var newG = $('#input-g').val();
    var newB = $('#input-b').val();

    R.update(R.findOne()._id, { $set: { value: newR } });
    G.update(G.findOne()._id, { $set: { value: newG } });
    B.update(B.findOne()._id, { $set: { value: newB } });

    Submitted.insert({
      r: newR,
      g: newG,
      b: newB,
      shown: false
    });

    Meteor.call('updateStatus', 'Submitted PWM values');

    // TODO ? Tell the Arduino it's ready
  }
});

/*
Template['object__pwm_input'].viewmodel({
  r: 0,
  g: 0,
  b: 0,
  updateRGB: function(e) {
    e.preventDefault();
    console.log(this.r(), this.g(), this.b());
    R.update(R.findOne()._id, { $set: { value: this.r() }});
    G.update(G.findOne()._id, { $set: { value: this.g() }});
    B.update(B.findOne()._id, { $set: { value: this.b() }});

    // TODO Display waiting message
  },
  changeR: function(e) {
    e.preventDefault();
    console.log(this.r(), this.g(), this.b());
    R.update(R.findOne()._id, { $set: { value: this.r() }});
  }
});
*/

Template['object__rgb_output'].helpers({
  sensor: function() {
    return Sensor.findOne();
  }
});

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

Template['object__rgb_output'].events({
  'click #generateColour': function(e) {
    Meteor.call('updateStatus', 'Generated colour');

    e.preventDefault();

    var rgb = Sensor.findOne();

    $('#rgb_output__led').css('background-color', function() {
      return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
    });
  }
});

Template['object__pwm_output'].rendered = function() {
  time = new Date().getTime();

  var dataRed = [];
  dataRed.push({
      x: time,
      y: 0
  });

  var dataGreen = [];
  dataGreen.push({
      x: time,
      y: 0
  });

  var dataBlue = [];
  dataBlue.push({
      x: time,
      y: 0
  });

  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  // http://www.highcharts.com/demo/dynamic-update
  $('#pwm_output__graph').highcharts({
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var seriesR = this.series[0];
          var seriesG = this.series[1];
          var seriesB = this.series[2];
          var chart = this;

          setInterval(function () {
            var nextRGB = Submitted.findOne(); 

            if (nextRGB) {
              var x = new Date().getTime(); // current time
              console.log(nextRGB.r);
              seriesR.addPoint([x, parseInt(nextRGB.r)], false, false);
              seriesG.addPoint([x, parseInt(nextRGB.g)], false, false);
              seriesB.addPoint([x, parseInt(nextRGB.b)], false, false);
              chart.redraw();

              Submitted.update(nextRGB._id, { $set: { shown: true } });
            }
          }, 1000);
        }
      }
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 5
    },
    yAxis: {
      min: 0,
      max: 255,
      plotLines: [
        {
          value: 0,
          width: 1,
          color: '#F2002D'
        },
        {
          value: 0,
          width: 1,
          color: '#65C58C'
        },
        {
          value: 0,
          width: 1,
          color: '#4EBCE5'
        }
      ]
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Red',
        data: dataRed
      },
      {
        name: 'Green',
        data: dataGreen
      },
      {
        name: 'Blue',
        data: dataBlue
      }
    ]
  });
};
