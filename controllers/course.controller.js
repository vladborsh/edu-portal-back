var Course = require("../models/course.model").model;

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
  Course.find().exec(function(err, items) {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(items);
    }
  });
}

function get(req, res) {
  Course.findById(req.params.id).exec(function(err, item) {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(item);
    }
  });
}

function create(req, res) {
  var course = new Course(req.body);
  course.createdDate = Date.now();
  course.save(function(err, item) {
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
  Course.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if (err) {
      res.json({ success: false, message: "Невозможно обновить: " + err });
    } else {
      res.json({ success: true, message: "Обновлено" });
    }
  });
}

function remove(req, res) {
  Course.findById(req.params.id, function(err, item) {
    if (err) {
      res.json({ success: false, message: "Невозможно удалить: " + err });
    } else {
      item.remove();
      res.json({ success: true, message: "Удалено" });
    }
  });
}
