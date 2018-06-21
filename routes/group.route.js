var controller = require('../controllers/group.controller');
var auth = require('../middle/auth');
var router = require('express').Router();

router.get('/', auth.isAuthenticated, controller.getAll);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/', auth.isAuthenticated, controller.create);
router.post('/:id', auth.isAuthenticated, controller.update);
router.post('/extend_journal/:id', auth.isAuthenticated, controller.extendJournal);
router.post('/mark/:id', auth.isAuthenticated, controller.updateMark);
router.post('/journal_makrs_date/:id', auth.isAuthenticated, controller.setJournalMarksDate);
router.delete('/:id', auth.isAuthenticated, controller.remove);

module.exports = router;