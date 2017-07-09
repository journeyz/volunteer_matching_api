var app = require('../server');

module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.find({where: {username: 'administrator', realm: 'admin'}}, function(err, admin_user) {
    if (err) return debug(err);
    if (admin_user.length == 0) {
      User.create([
        {username: 'administrator', email: 'administrator@junyx.net', password: process.env.ADMIN_PASS, realm: 'admin'},
        {username: 'superuser', email: 'superuser@junyx.net', password: process.env.ADMIN_PASS, realm: 'admin'}
      ], function(err, users) {
        if (err) return debug('%j', err);
        Role.find({where: {name: 'admin'}}, function(err, roles) {
          if (roles.length == 0) {
            Role.create({
              name: 'admin'
            }, function(err, role) {
              users.map(function(user) {
                if (user.realm == "admin") {return user;}
              })
              .filter(function(user) {return user != undefined})
              .forEach(function(user) {
                role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: user.id
                });
              });
            });
          };
        });
      });
    };
  });
};
