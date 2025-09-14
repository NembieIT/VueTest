const router = require('express').Router();
const ContactController = require('../controller/contactController');

router.post('/add', ContactController.addContact);
router.get('/', ContactController.getAllContact);
router.delete('/:id', ContactController.deleteContact);
module.exports = router;