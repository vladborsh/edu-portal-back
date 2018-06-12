var Activity = require("../models/activity.model").model;

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
  Activity.find()
    .exec(function(err, items) {
      if (err) {
        res.json({ success: false, message: "Невозможно найти: " + err });
      } else {
        res.json(items);
      }
    });
}

function get(req, res) {
  Activity.findById(req.params.id)
    .exec(function(err, item) {
      if (err) {
        res.json({ success: false, message: "Невозможно найти: " + err });
      } else {
        res.json(item);
      }
    });
}

function create(req, res) {
  var activity = new Activity(req.body);
  activity.createdDate = Date.now();
  activity.save(function(err, item) {
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
  Activity.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if (err) {
      res.json({ success: false, message: "Невозможно обновить: " + err });
    } else {
      res.json({ success: true, message: "Обновлено" });
    }
  });
}

function remove(req, res) {
  Activity.findById(req.params.id, function(err, item) {
    if (err) {
      res.json({ success: false, message: "Невозможно удалить: " + err });
    } else {
      item.remove();
      res.json({ success: true, message: "Удалено" });
    }
  });
}
