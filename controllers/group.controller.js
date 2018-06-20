var Group = require("../models/group.model").model;
var JournalRow = require("../models/group.model").JournalRowModel;

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
  Group.find()
    .populate("users")
    .exec((err, items) => {
      if (err) {
        res.json({ success: false, message: "Невозможно найти: " + err });
      } else {
        res.json(items);
      }
    });
}

function get(req, res) {
  Group.findById(req.params.id)
    .populate({
      path: "journals",
      populate: [
        { path: "_subject" },
        { path: "journalRows" }
      ]
    })
    .exec((err, group) => {
      if (err) {
        res.json({ success: false, message: "Невозможно найти: " + err });
      } else {
        getJournalRows(group, res);
      }
    });
}


function getJournalRows(group, res) {
  let idSet = [];
  group.journals.forEach( journal => 
    journal.journalRows.forEach(journalRow => {
      idSet.push(journalRow._id);
    })
  );
  JournalRow.find({_id: { $in : idSet }})
    .populate([
      { path: "_student" },
      { path: "marks" }
    ])
    .exec((err, journalRows) => {
      if (err) {
        res.json({ success: false, message: "Невозможно найти: " + err });
      } else {
        group.journals.forEach( journal => 
          journal.journalRows = journal.journalRows.map(journalRow => 
            journalRows.find( jRow => jRow._id.toString() == journalRow._id.toString())
          )
        );
        res.json(group);
      }
    });
}



function create(req, res) {
  var group = new Group(req.body);
  group.createdDate = Date.now();
  group.save((err, item) => {
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
  Group.findByIdAndUpdate(req.params.id, req.body, err => {
    if (err) {
      res.json({ success: false, message: "Невозможно обновить: " + err });
    } else {
      res.json({ success: true, message: "Обновлено" });
    }
  });
}

function remove(req, res) {
  Group.findById(req.params.id, (err, item) => {
    if (err) {
      res.json({ success: false, message: "Невозможно удалить: " + err });
    } else {
      item.remove();
      res.json({ success: true, message: "Удалено" });
    }
  });
}
