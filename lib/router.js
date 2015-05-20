Router.configure({
});

Router.route('/', {
  name: 'index',
  layoutTemplate: 'layout',
  template: 'index',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [ Meteor.subscribe('rooms'), Meteor.subscribe('workspaces') ];
  },
  data: function() {
    return { workspaces: Workspaces.find() };
  },
  action: function() {
    this.render();
  }
});

Router.route('/room/:_id', {
  name: 'room',
  template: 'workspace',
  onBeforeAction: function() {
    // Check for the existence of a room
    var room = Rooms.findOne(this.params._id);

    if (room) {
    } else {
      Router.go('index');
    }

    // TODO Check if there's room for the user

    this.next();
  },
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('room', this.params._id);
  },
  data: function() {
    return Rooms.findOne(this.params._id);
    //return { room: Rooms.findOne(this.params._id) };
  },
  action: function() {
     this.render();
  }
});

var requiredLogin = function() {
  if (!Meteor.user()) {
    Router.go('index');
  }
  this.next();
}

//Router.onBeforeAction('requiredLogin', { only: ['room'] });
