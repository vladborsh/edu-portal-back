var User = require("../models/user.model").model;
var Group = require("../models/group.model").model;
var JournalRow = require("../models/group.model").JournalRowModel;
var Mark = require("../models/group.model").MarkModel;
var jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV || 'dev';
var secret = require('../config/' + env + '.config').secret;
var sendEmail = require("../mailer/mailer.service").sendEmail;

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.auth = auth;
module.exports.sendCode = sendCode;
module.exports.verify = verify;
module.exports.setNewPass = setNewPass;

function getAll(req, res) {
  User.find().exec( (err, items) => {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(items);
    }
  });
}

function get(req, res) {
  User.findById(req.params.id).exec( (err, item) => {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(item);
    }
  });
}

function create(req, res) {
  let GROUP;
  let USER;
  let JOURNAL_ROWS;
  User
	  .findOne({ email: req.body.email })
	  .exec( (err, item) => {
      if(!!item) {
        res.json({ success: false, message: "Невозможно создать: пользователь с таким email уже существует" });
      } else {
        var user = new User(req.body);
        let code = String(Date.now()).slice(2,7);
        user.createdDate = Date.now();
        user.verificationCode = code;
        user.active = false;
        user.save()
        .then(
          user => {
            USER = user;
            if (!!user.email) {
              sendEmail('v.borsh@gmial.com', user.email, 'Verification code', code);
            }
            return Group.findOne({ _id: req.body._group })
              .populate({ path: 'journals' })
              .exec()
          }
        )
        .then(
          group => {
            GROUP = group;
            if (group.journals.length > 0) {
              return Promise.all(
                group.journals.map( journal => {
                  let journalRow = new JournalRow();
                  journalRow._student = USER._id
                  console.log('save journal row for user')
                  return journalRow.save();
                })
              ) 
            } else {
              res.json({ success: true, message: "Создано", item: user });
            }
          }
        )
        .then(
          journalRowList => {
            JOURNAL_ROWS = journalRowList;
            return Promise.all(
              GROUP.journals.map( (journal, i) => {
                journal.journalRows.push(JOURNAL_ROWS[i]._id);
                console.log('save journal row id in journal')
                return journal.save()
              })
            )
          }
        )
        .then(
          journals => {
            return Promise.all( 
              JOURNAL_ROWS.map( (journalRow, i_main) => {
                let marksList = [];
                if (!!journals[i_main].markListSize) {
                  for ( let i = 0; i < journals[i_main].markListSize; i++ ) {
                    let mark = new Mark();
                    marksList.push(mark.save());
                  }
                } 
                console.log('save marks list journal row ')
                console.log(marksList.length)
                return Promise.all(marksList);
              })
            );
          }
        )
        .then(
          marksListOfLists => {
            console.log(marksListOfLists);
            return Promise.all( 
              marksListOfLists.map( (markList, i_main) => {
                if (markList.length == 0) {
                  return Promise.resolve();
                } else {
                  markList.forEach( (mark,i) => {
                    JOURNAL_ROWS[i_main].marks.push(mark._id);
                    console.log('save mark id in journal row')
                  });
                  return JOURNAL_ROWS[i_main].save();
                }
              })
            );
          }
        )
        .then(
          () => {
            res.json({ success: true, message: "Создано", item: user });
          }
        ).catch(
          err => {
            res.json({ success: false, message: "Невозможно создать: " + err });
          }
        )
      }
    })
}

function update(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, (err) => {
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
	  .exec(function (err, user) {
      if (err) throw err;
      if (!user) {
        res.json({success:false, message: 'Невозможно авторизироваться'});
      } else if (user && !user.active) {
        res.json({success:false, message: 'Невозможно авторизироваться. Пользователь еще не активирован'});
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
            id: user._id
          });
        }
      }
    })
}

function sendCode(req, res) {
  User
    .findOne({ email: req.body.email })
    .exec( (err, item) => {
      if (err) throw err;
      if (!item) {
        res.json({ success: false, message: "Такого пользователя не существует" });
      } else {
        let code = String(Date.now()).slice(2,7);
        sendEmail('v.borsh@gmial.com', item.email, 'Verification code', code);
        item.verificationCode = code;
        item.save();
        res.json({ success: true, message: "Код отправлен" });
      }
    })
}

function verify(req, res) {
  User
    .findOne({ email: req.body.email })
    .exec( (err, item) => {
      if (err) throw err;
      if (!item) {
        res.json({ success: false, message: "Такого пользователя не существует" });
      } else if (item.verificationCode === req.body.verificationCode) {
        item.active = true;
        item.save();
        res.json({ 
          success: true, 
          message: "Код правильный. Можете сменить пароль" });
      } else {
        res.json({ success: false, message: "Код неправильный" });
      }
    })
}

function setNewPass(req, res) {
  console.log(req.body);
  User
    .findOne({ email: req.body.email, verificationCode: req.body.verificationCode })
    .exec( (err, item) => {
      if (err) throw err;
      if (!item) {
        res.json({ success: false, message: "Такого пользователя не существует" });
      } else {
        item.password = req.body.password;
        item.save();
        res.json({ success: true, message: "Пароль обновлен" });
      }
    })
}
