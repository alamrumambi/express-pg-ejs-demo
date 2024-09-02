const pool = require('../db/connection');

class Book {
    constructor(id, name, genre, stock, AuthorId, author) {
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.stock = stock;
        this.AuthorId = AuthorId;
        this.author = author;
    }

    async incrementStock() {
        let query = `update "Books" set stock = stock + 1 where id = $1`;
        await pool.query(query, [ this.id ]);
    }

    async decrementStock() {
        let query = `update "Books" set stock = stock - 1 where id = $1`;
        await pool.query(query, [ this.id ]);
    }

    async destroy() {
        let query = `delete from "Books" where id = $1`;
        await pool.query(query, [ this.id ]);
    }

    static async findAll() {
        let query = `select b.*, a.name author from "Books" b join "Authors" a on a.id = b."AuthorId"`;
        let { rows } = await pool.query(query);
        rows = rows.map(({ id, name, genre, stock, AuthorId, author }) => new Book(id, name, genre, stock, AuthorId, author))
        return rows;
    }

    static async findByPk(id) {
        let query = `select b.*, a.name author from "Books" b join "Authors" a on a.id = b."AuthorId" where b.id = $1`;
        let { rows } = await pool.query(query, [ id ]);
        rows = rows.map(({ id, name, genre, stock, AuthorId, author }) => new Book(id, name, genre, stock, AuthorId, author))
        return rows[0];
    }

    static async create(name, genre, stock, AuthorId) {
        let query = `insert into "Books" (name, genre, stock, "AuthorId")
        values ($1, $2, $3, $4)`
        await pool.query(query, [ name, genre, stock, AuthorId ]);
    }

    static async update(name, genre, stock, AuthorId, id) {
        let query = `update "Books" set
        name = $1, 
        genre = $2, 
        stock = $3, 
        "AuthorId" = $4
        where id = $5`
        await pool.query(query, [ name, genre, stock, AuthorId, id ]);
    }
}

module.exports = Book;