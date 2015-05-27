Template['room__items'].helpers({
  objects: function() {
    return Objects.find();
  },
  dataSources: function() {
    // Colour sensor is one!
    return DataSources.find();
  }
});

Template['room__items'].rendered = function() {
  var room = Rooms.findOne();
  $('#items__target_colour').css('background-color', function() {
    return room.colour;
  });
};
