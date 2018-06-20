var Subject = require("../models/subject.model").model;
var Group = require("../models/group.model").model;
var User = require("../models/user.model").model;
var Journal = require("../models/group.model").JournalModel;
var JournalRow = require("../models/group.model").JournalRowModel;

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
  Subject.find().exec(function(err, items) {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(items);
    }
  });
}

function get(req, res) {
  Subject.findById(req.params.id).exec(function(err, item) {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(item);
    }
  });
}

function create(req, res) {
  var subject = new Subject(req.body);
  subject.createdDate = Date.now();
  subject.save( (err, subject) => {
    if (err) {
      res.json({ success: false, message: "Невозможно создать: " + err });
    } else {
      Group.findOne({ _id: req.body._group })
        .exec((err, groupMajor) => {
          if (err) { console.log(err); return }
          var journal = new Journal({
            _subject: subject._id
          });
          journal.save( (err, journal ) => {
            if (err) { console.log(err); return }
            groupMajor.journals.push(journal._id);
            groupMajor.save( (err, group) => {
              if (err) { console.log(err); return }
              User.find({ _group: group._id })
                .exec( (err, users) => {
                  if (err) { console.log(err); return }
                  users.forEach(user => {
                    var journalRow = new JournalRow();
                    journalRow._student = user._id
                    journalRow.save( (err, jRow ) => {                 
                      if (err) { console.log(err); return }

                      Group.findOne({ _id: req.body._group })
                        .populate('journals')
                        .exec((err, groupMajor) => 
                          groupMajor.journals
                            .filter( journal => journal._subject.toString() === subject._id.toString())
                            .forEach( journal => {
                              journal.journalRows.push(jRow._id);
                              journal.save((err, jRow ) => {
                                if (err) { console.log(err); return }
                              })
                          })
                        )
                    })
                  });
                })
            })
          })
        })
      res.json({
        success: true,
        message: "Создано",
        item: subject
      });
    }
  });
}

function update(req, res) {
  Subject.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      res.json({ success: false, message: "Невозможно обновить: " + err });
    } else {
      res.json({ success: true, message: "Обновлено" });
    }
  });
}

function remove(req, res) {
  Subject.findById(req.params.id, (err, item) => {
    if (err) {
      res.json({ success: false, message: "Невозможно удалить: " + err });
    } else {
      item.remove();
      res.json({ success: true, message: "Удалено" });
    }
  });
}
