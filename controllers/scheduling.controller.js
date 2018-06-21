var Scheduling = require("../models/scheduling.model").model;
var mongoose = require("mongoose");


module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
  Scheduling
    .find({ _group: mongoose.Types.ObjectId(req.params.id) })
    .populate('_subject')
    .exec((err, items) => {
      if (err) {
        res.json({ success: false, message: "Невозможно найти: " + err });
      } else {
        res.json(items);
      }
    });
}

function get(req, res) {
  Scheduling.findById(req.params.id).exec( (err, item) => {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(item);
    }
  });
}

function create(req, res) {
  var scheduling = new Scheduling(req.body);
  scheduling.createdDate = Date.now();
  scheduling.save( (err, item) => {
    if (err) {
      res.json({ success: false, message: "Невозможно создать: " + err });
    } else {
      res.json({ success: true, message: "Создано", item: item });
    }
  });
}

function update(req, res) {
  Scheduling.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      res.json({ success: false, message: "Невозможно обновить: " + err });
    } else {
      res.json({ success: true, message: "Обновлено" });
    }
  });
}

function remove(req, res) {
  Scheduling.findById(req.params.id, (err, item) => {
    if (err) {
      res.json({ success: false, message: "Невозможно удалить: " + err });
    } else {
      item.remove();
      res.json({ success: true, message: "Удалено" });
    }
  });
}
