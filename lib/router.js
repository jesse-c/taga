Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function() {
  this.render('index');
});

function requiredLogin(path, next) {
  // this works only because the use of Fast Render
  var redirectPath = (!Meteor.userId())? '/index' : null;
  next(redirectPath);
}
