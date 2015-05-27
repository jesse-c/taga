Meteor.startup(function() {
  // Test user
  if (!Meteor.users.find().count()) {
    Accounts.createUser({
      username: 'test',
      email: 'test@test.com',
      password: 'testtest'
    });

    // Workspace
    var workspace = Workspaces.insert({
      name: "PWM/Colour theory",
      description: "Students learnt about PWM and colour theory by controlling an RGB LED.",
      _rooms: [],
      _dataSources: [],
      _objects: []
    });

    var objs = [
      // Power
      {
        name: 'Power',
        _workspaces: [workspace],
        id: 'object__power',
        class: 'window',
        top: 60,
        left: 276
      },
      // Ground
      {
        name: 'Ground',
        _workspaces: [workspace],
        id: 'object__ground',
        class: 'window',
        top: 588,
        left: 420
      },
      // PWM Input
      {
        name: 'PWM Input',
        _workspaces: [workspace],
        id: 'object__pwm_input',
        class: 'window',
        top: 168,
        left: 672
      },
      // RGB LED 
      {
        name: 'RGB LED',
        _workspaces: [workspace],
        id: 'object__rgb_led',
        class: 'window',
        top: 372,
        left: 240
      },
      // RGB Sensor
      {
        name: 'RGB Sensor',
        _workspaces: [workspace],
        id: 'object__rgb_sensor',
        class: 'window',
        top: 444,
        left: 672
      },
      // RGB Output
      {
        name: 'RGB Output',
        _workspaces: [workspace],
        id: 'object__output',
        class: 'window',
        top: 588,
        left: 792
      },
      // PWM Output
      {
        name: 'PWM Output',
        _workspaces: [workspace],
        id: 'object__pwm_output',
        class: 'window',
        top: 72,
        left: 256
      }
    ];

    var objsIds = [];
    for (o in objs) {
      var newId = Objects.insert(objs[o]);
      objsIds.push(newId);
    }

    // Do the same for data sources -- only 1, RGB Sensor
    var dataSourcesIds = [];
    dataSourcesIds.push(DataSources.insert({
        name: 'RGB Sensor',
        _workspaces: [workspace],
        id: 'object__rgb_sensor',
        class: 'window',
        top: 444,
        left: 672
    }));

    Workspaces.update(workspace, { $set: { _objects: objsIds } });
    Workspaces.update(workspace, { $set: { _dataSources: dataSourcesIds } });

    // RGB
    R.insert({ value: 0 }); 
    G.insert({ value: 0 }); 
    B.insert({ value: 0 }); 
    Sensor.insert({ r: 0, g: 0, b: 0 }); 
  }
});
