const Author = require("../models/author");
const Book = require("../models/book");

class Controller {
    static async readBooks(req, res) {
        const { search, error, msg } = req.query;
        try {
            const data = await Book.findAll(search);
            // res.send(data);
            res.render('Home', { data, error, msg });
        } catch(err) {
            res.send(err);
        }
    }

    static async readAuthors(req, res) {
        try {
            const data = await Author.findAll();
            // res.send(data);
            res.render('Author', { data });
        } catch(err) {
            res.send(err);
        }
    }

    static async getAddBook(req, res) {
        const { errors } = req.query;
        try {
            // console.log(errors);
            const authors = await Author.findAll();
            // console.log(authors);
            // res.send(authors);
            res.render('AddForm', { authors, errors });
        } catch(err) {
            res.send(err);
        }
    }

    static async postAddBook(req, res) {
        try {
            const { name, genre, stock, AuthorId } = req.body;
            await Book.create({ name, genre, stock, AuthorId });
            res.redirect('/');
        } catch(err) {
            if (err.name == 'ValidationError') {
                console.log('masuk validation')
                return res.redirect(`/books/add?errors=${err.errors}`);
            }
            res.send({ name: err.name, message: err.message });
        }
    }

    static async getEditBook(req, res) {
        const { id } = req.params;
        const { errors } = req.query;
        try {
            const authors = await Author.findAll();
            const book = await Book.findByPk(id);
            // res.send({ authors, book });
            res.render('EditForm', { authors, book, errors });
        } catch(err) {
            res.send(err);
        }
    }

    static async postEditBook(req, res) {
        const { id } = req.params;
        try {
            const { name, genre, stock, AuthorId } = req.body;
            await Book.update({ name, genre, stock, AuthorId }, id);
            res.redirect('/');
        } catch(err) {
            if (err.name == 'ValidationError') {
                return res.redirect(`/books/edit/${id}?errors=${err.errors}`);
            }
            res.send(err);
        }
    }

    static async incrementStock(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            // await Book.updateStock({ stock: book.stock + 1 }, id);
            // await book.incrementStock();
            await book.updateStock('increment');
            res.redirect('/');
        } catch(err) {
            if (err.name == 'ValidationError') {
                return res.redirect(`/?error=${err.message}`)
            }
            res.send(err);
        }
    }

    static async decrementStock(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            // await Book.updateStock({ stock: book.stock + 1 }, id);
            // await book.decrementStock();
            // if (book.stock == 0) throw `tidak bisa dibeli lagi, stok sudah habis`;
            await book.updateStock('decrement');
            res.redirect('/');
        } catch(err) {
            if (err.name == 'ValidationError') {
                return res.redirect(`/?error=${err.message}`)
            }
            res.send(err);
        }
    }

    static async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            // if (book.stock > 0) throw `tidak bisa dihapus, masih ada stok`;
            await book.destroy();
            res.redirect('/?msg=Buku berhasil dihapus');
        } catch(err) {
            if (err.name == 'ValidationError') {
                return res.redirect(`/?error=${err.message}`)
            }
            res.send(err);
        }
    }
}

module.exports = Controller;