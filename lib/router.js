FlowRouter.route('/index', {
  name: 'index',

  subscriptions: function(params, queryParams) {
    this.register('workspaces', Meteor.subscribe('workspaces'));
  },

  action: function(params, queryParams) {
    FlowLayout.render('l', { main: 'index' });
  }
});

//FlowRouter.route('/workspace/:workspaceId/:roomId', {
FlowRouter.route('/workspace', {
  name: 'workspace',

  subscriptions: function(params, queryParams) {
    //this.register('workspace', Meteor.subscribe('workspaces', params.workspaceId));
    //this.register('room', Meteor.subscribe('rooms', params.roomId));
  },

  action: function(params, queryParams) {
    FlowLayout.render('workspace');
  }
});

/*
FlowRouter.notFound = {
  subscriptions: function() {
  },

  actions: function() {
    FlowLayout.render('layout', { main: 'notFound' });
  }
};
*/

function requiredLogin(path, next) {
  // this works only because the use of Fast Render
  var redirectPath = (!Meteor.userId())? '/index' : null;
  next(redirectPath);
}
