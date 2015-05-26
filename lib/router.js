Router.configure({
});

Router.route('/', {
  name: 'index',
  layoutTemplate: 'layout',
  template: 'index',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [ 
             Meteor.subscribe('rooms'),
             Meteor.subscribe('workspaces'),
             Meteor.subscribe('objects'),
             Meteor.subscribe('#r'), Meteor.subscribe('#g'), Meteor.subscribe('#b') 
           ];
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
  template: 'room',
  onBeforeAction: function() {
    // Check for the existence of a room
    var room = Rooms.findOne(this.params._id);

    if (room) {
    } else {
      Router.go('index');
    }

    // Check if there's room for the user
    if (room.hasSpace()) {
      // Check if they're already in the room
      if (_.contains(room._users, Meteor.user()._id)) {
      } else {
        Rooms.update(this.params._id, { $push: { _users: Meteor.user()._id } });
      }
    } else {
      Router.go('index');
    }

    this.next();
  },
  loadingTemplate: 'loading',
  waitOn: function() {
    // TODO Add data sources, etc.
    return [ 
             Meteor.subscribe('room', this.params._id),
             //Meteor.subscribe('workspace');
             Meteor.subscribe('workspace', { _rooms: this.params._id }),
             //Meteor.subscribe('objects', { _workspaces: room._workspace }),
             Meteor.subscribe('objects'),
             Meteor.subscribe('objectInstances', this.params._id),
             Meteor.subscribe('objectInstancesTransient', this.params._id)
           ];
  },
  data: function() {
    //return Rooms.findOne(this.params._id);
    return { room: Rooms.findOne(this.params._id) };
  },
  action: function() {
     this.render();
  }
});

Iron.Router.hooks.requiredLogin = function() {
  if (!Meteor.user()) {
    Router.go('index');
  }
  this.next();
}

Router.onBeforeAction('requiredLogin', { only: ['room'] });
