const Author = require("../models/author");
const Book = require("../models/book");

class Controller {
    static async home(req, res) {
        try {
            const data = await Book.findAll();
            res.render('Home', { data });
        } catch(err) {
            res.send(err.message);
        }
    }

    static async getAdd(req, res) {
        try {
            const authors = await Author.findAll();
            res.render('AddForm', { authors, genres: Book.genres });
        } catch(err) {
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

    static async addStock(req, res) {
        const { id } = req.params;
        try {
            await Book.updateStock(id, '+');
            res.redirect('/');
        } catch(err) {
            res.send(err.message);
        }
    }

    static async buyStock(req, res) {
        const { id } = req.params;
        try {
            // ambil 1 data berdasarkan id, dan cek stock nya
            // apabila sudah 0, maka langsung throw err
            const data = await Book.findByPk(id);
            if (data.stock == 0) throw { message: 'minimum stock is 0' }
            await Book.updateStock(id, '-');
            res.redirect('/');
        } catch(err) {
            res.send(err.message);
        }
    }

    static async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const data = await Book.findByPk(id);
            if (data.stock != 0) throw { message: 'stock masih masih banyak pak' }
            await Book.destroy(id);
            res.redirect('/');
        } catch(err) {
            res.send(err.message);
        }
    }

    static async getEdit(req, res) {
        const { id } = req.params;
        try {
            const authors = await Author.findAll();
            const book = await Book.findByPk(id);
            res.render('EditForm', { authors, genres: Book.genres, book });
        } catch(err) {
            res.send(err.message);
        }
    }

    static async postEdit(req, res) {
        const { id } = req.params;
        const { name, genre, stock, AuthorId } = req.body;
        try {
            await Book.update(name, genre, stock, AuthorId, id);
            res.redirect('/');
        } catch(err) {
            res.send(err.message);
        }
    }
}

module.exports = Controller;