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
  }
});
