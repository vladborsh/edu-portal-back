var controller = require('../controllers/scheduling.controller');
var auth = require('../middle/auth');
var router = require('express').Router();

router.get('/:id', auth.isAuthenticated, controller.getAll);
router.post('/', auth.isAuthenticated, controller.create);
router.post('/:id', auth.isAuthenticated, controller.update);

module.exports = router;