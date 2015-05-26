Meteor.startup(function() {
  // Test user
  if (!Meteor.users.find().count()) {
    Accounts.createUser({
      username: 'test',
      email: 'test@test.com',
      password: 'testtest'
    });
  }

  // Objects
  if (!Objects.find().count()) {
    // Workspace
    var workspace = Workspaces.insert({
      name: "PWM/Colour theory",
      description: "Students learnt about PWM and colour theory by controlling an RGB LED.",
      _rooms: [],
      _objects: []
    });

    var objs = [
      // Power
      {
        name: 'Power',
        _workspaces: [workspace],
        id: 'object__power',
        class: 'window',
        top: 8 * 12,
        left: 8 * 12
      },
      // Ground
      {
        name: 'Ground',
        _workspaces: [workspace],
        id: 'object__ground',
        class: 'window',
        top: 8 * 12,
        left: 40 * 12
      },
      // PWM Input
      {
        name: 'PWM Input',
        _workspaces: [workspace],
        id: 'object__pwm_input',
        class: 'window',
        top: 40 * 12,
        left: 40 * 12
      },
      // RGB LED 
      {
        name: 'RGB LED',
        _workspaces: [workspace],
        id: 'object__rgb_led',
        class: 'window',
        top: 50 * 12,
        left: 40 * 12
      },
      // RGB Sensor
      {
        name: 'RGB Sensor',
        _workspaces: [workspace],
        id: 'object__rgb_sensor',
        class: 'window',
        top: 60 * 12,
        left: 40 * 12
      },
      // RGB Output
      {
        name: 'RGB Output',
        _workspaces: [workspace],
        id: 'object__ground',
        class: 'window',
        top: 70 * 12,
        left: 40 * 12
      },
      // PWM Output
      {
        name: 'PWM Output',
        _workspaces: [workspace],
        id: 'object__pwm_output',
        class: 'window',
        top: 80 * 12,
        left: 40 * 12
      }
    ];

    var objsIds = [];
    for (o in objs) {
      var newId = Objects.insert(objs[o]);
      objsIds.push(newId);
    }

    Workspaces.update(workspace, { $set: { _objects: objsIds } });
  }
});
