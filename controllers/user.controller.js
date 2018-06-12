var User = require("../models/user.model").model;
var jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV || 'dev';
var secret = require('../config/' + env + '.config').secret;

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.auth = auth;

function getAll(req, res) {
  User.find().exec(function(err, items) {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(items);
    }
  });
}

function get(req, res) {
  User.findById(req.params.id).exec(function(err, item) {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(item);
    }
  });
}

function create(req, res) {
  var user = new User(req.body);
  user.createdDate = Date.now();
  user.save(function(err, item) {
    if (err) {
      res.json({ success: false, message: "Невозможно создать: " + err });
    } else {
      res.json({
        success: true,
        message: "Создано",
        item: item
      });
    }
  });
}

function update(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if (err) {
      res.json({ success: false, message: "Невозможно обновить: " + err });
    } else {
      res.json({ success: true, message: "Обновлено" });
    }
  });
}

function remove(req, res) {
  User.findById(req.params.id, function(err, item) {
    if (err) {
      res.json({ success: false, message: "Невозможно удалить: " + err });
    } else {
      item.remove();
      res.json({ success: true, message: "Удалено" });
    }
  });
}

function auth(req, res) {
	User
	  .findOne({ email: req.body.email })
	  .select('email password role firstName lastName _id')
	  .exec(function (err, user) {
      if (err) throw err;
      if (!user) {
        res.json({success:false, message: 'Невозможно авторизироваться'});
      } else {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({success:false, message: 'Неверный пароль'});
        } else {
          var token = jwt.sign({ _id : user._id }, secret, {expiresIn: '24h'});
          res.json({
            success:true, 
            message: 'Пользователь авторизирован', 
            token: token,
            role: user.role,
            id: user._id,
            username: user.firstName + ' ' + user.lastName
          });
        }
      }
    })
}
