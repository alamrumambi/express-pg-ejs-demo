const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/', Controller.home);
router.get('/books/add', Controller.getAdd);
router.post('/books/add', Controller.postAdd);
router.get('/books/edit/:id', Controller.getEdit);
router.post('/books/edit/:id', Controller.postEdit);
router.get('/books/add/:id', Controller.addStock);
router.get('/books/buy/:id', Controller.buyStock);
router.get('/books/delete/:id', Controller.deleteBook);

module.exports = router;