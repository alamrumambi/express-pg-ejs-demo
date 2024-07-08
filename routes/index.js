const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/', Controller.readBooks);
router.get('/authors', Controller.readAuthors);
router.get('/books/add', Controller.getAddBook);
router.post('/books/add', Controller.postAddBook);
router.get('/books/edit/:id', Controller.getEditBook);
router.post('/books/edit/:id', Controller.postEditBook);
router.get('/books/add/:id', Controller.incrementStock);
router.get('/books/buy/:id', Controller.decrementStock);
router.get('/books/delete/:id', Controller.deleteBook);

module.exports = router;