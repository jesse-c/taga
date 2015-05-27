Template['room__items'].helpers({
  objects: function() {
    return Objects.find();
  }
  /*
  dataSources: function() {
    // Colour sensor is one!
    return DataSources.find();
  }
  */
});
