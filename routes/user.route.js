var controller = require('../controllers/user.controller');
var auth = require('../middle/auth');
var router = require('express').Router();

router.post('/code', controller.sendCode);
router.post('/verify', controller.verify);
router.post('/auth', controller.auth);
router.post('/setpass', controller.setNewPass);
router.post('/', controller.create);
router.get('/', auth.isAuthenticated, controller.getAll);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/:id', auth.isAuthenticated, controller.update);
router.delete('/:id', auth.isAuthenticated, controller.remove);

module.exports = router;