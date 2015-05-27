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

    R.update(R.findOne()._id, { $set: { value: $('#input-r').val() }});
    G.update(G.findOne()._id, { $set: { value: $('#input-g').val() }});
    B.update(B.findOne()._id, { $set: { value: $('#input-b').val() }});

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
