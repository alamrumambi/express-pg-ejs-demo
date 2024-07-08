const Author = require("../models/author");
const Book = require("../models/book");

class Controller {
    static async readBooks(req, res) {
        const { search } = req.query;
        try {
            const data = await Book.findAll(search);
            // res.send(data);
            res.render('Home', { data });
        } catch(err) {
            res.send(err);
        }
    }

    static async getAddBook(req, res) {
        try {
            const authors = await Author.findAll();
            // console.log(authors);
            // res.send(authors);
            res.render('AddForm', { authors });
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
            console.log(err);
            res.send(err);
        }
    }

    static async getEditBook(req, res) {
        const { id } = req.params;
        try {
            const authors = await Author.findAll();
            const book = await Book.findByPk(id);
            // res.send({ authors, book });
            res.render('EditForm', { authors, book });
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
            console.log(err);
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
            res.send(err);
        }
    }

    static async decrementStock(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            // await Book.updateStock({ stock: book.stock + 1 }, id);
            // await book.decrementStock();
            if (book.stock == 0) throw `tidak bisa dibeli lagi, stok sudah habis`;
            await book.updateStock('decrement');
            res.redirect('/');
        } catch(err) {
            res.send(err);
        }
    }

    static async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            if (book.stock > 0) throw `tidak bisa dihapus, masih ada stok`;
            await book.destroy();
            res.redirect('/');
        } catch(err) {
            res.send(err);
        }
    }
}

module.exports = Controller;