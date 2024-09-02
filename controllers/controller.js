const Author = require("../models/author");
const Book = require("../models/book");

class Controller {
    static async read(req, res) {
        try {
            const result = await Book.findAll();
            res.render('Home', { data: result });
        } catch(err) {
            res.send(err.message);
        }
    }

    static async getAdd(req, res) {
        try {
            const result = await Author.findAll();
            // res.send(result);
            res.render('AddForm', { authors: result });
        } catch(err) {
            console.error(err);
            res.send(err.message);
        }
    }

    static async postAdd(req, res) {
        const { name, genre, stock, AuthorId } = req.body;
        try {
            await Book.create(name, genre, stock, AuthorId);
            res.redirect('/');
        } catch(err) {
            res.send(err.message);
        }
    }

    static async getEdit(req, res) {
        const { id } = req.params;
        try {
            const result = await Author.findAll();
            const book = await Book.findByPk(id);
            // res.send({result, book});
            res.render('EditForm', { authors: result, book });
        } catch(err) {
            console.error(err);
            res.send(err.message);
        }
    }

    static async postEdit(req, res) {
        const { name, genre, stock, AuthorId } = req.body;
        const { id } = req.params;
        try {
            await Book.update(name, genre, stock, AuthorId, id);
            res.redirect('/');
        } catch(err) {
            res.send(err.message);
        }
    }

    static async addStock(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            // console.log(book);
            await book.incrementStock();
            res.redirect('/');
        } catch(err) {
            console.error(err);
            res.send(err.message);
        }
    }

    static async buyStock(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            if (book.stock == 0) throw { message: `Stock habis, jangan coba-coba!!`}
            // console.log(book);
            await book.decrementStock();
            res.redirect('/');
        } catch(err) {
            console.error(err);
            res.send(err.message);
        }
    }

    static async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const book = await Book.findByPk(id);
            if (book.stock != 0) throw { message: `Stock belum habis, jangan coba-coba dihapus yahhhh!!`}
            // console.log(book);
            await book.destroy();
            res.redirect('/');
        } catch(err) {
            console.error(err);
            res.send(err.message);
        }
    }
}

module.exports = Controller;