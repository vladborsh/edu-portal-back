var Institute = require("../models/institute.model").model;

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;

function getAll(req, res) {
  Institute.find().exec(function(err, items) {
    if (err) {
      res.json({ success: false, message: "Невозможно найти: " + err });
    } else {
      res.json(items);
    }
  });
}

function get(req, res) {
  Institute.findById(req.params.id)
    .exec( (err, item) => {
      if (err) {
        res.json({ success: false, message: "Невозможно найти: " + err });
      } else {
        res.json(item);
      }
    });
}

function create(req, res) {
  var item = new Institute(req.body);
  item.createdDate = Date.now();
  item.save( (err, item) => {
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
  Institute.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) {
      res.json({ success: false, message: "Невозможно обновить: " + err });
    } else {
      res.json({ success: true, message: "Обновлено" });
    }
  });
}

function remove(req, res) {
  Institute.findById(req.params.id, (err, item) => {
    if (err) {
      res.json({ success: false, message: "Невозможно удалить: " + err });
    } else {
      item.remove();
      res.json({ success: true, message: "Удалено" });
    }
  });
}
