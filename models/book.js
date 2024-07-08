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

    async updateStock(param) {
        const query = `update "Books" set
        stock = $1 
        where id = $2`;
        await pool.query(query, [ param == 'increment' ?this.stock + 1 : this.stock - 1, this.id ]);
    }

    async destroy() {
        const query = `delete from "Books" where id = $1`;
        await pool.query(query, [ this.id ]);
    }

    // async incrementStock() {
    //     const query = `update "Books" set
    //     stock = $1 
    //     where id = $2`;
    //     await pool.query(query, [ this.stock + 1, this.id ]);
    // }

    // async decrementStock() {
    //     const query = `update "Books" set
    //     stock = $1 
    //     where id = $2`;
    //     await pool.query(query, [ this.stock - 1, this.id ]);
    // }

    static async findAll(search) {
        let query = `select b.*, a.name author from "Books" b
        join "Authors" a on b."AuthorId" = a.id
        `
        if (search) {
            query += ` where b.name ilike '%${search}%'`;
        }
        console.log(query);
        let { rows } = await pool.query(query);
        rows = rows.map(({ id, name, genre, stock, AuthorId, author }) => new Book(id, name, genre, stock, AuthorId, author));
        return rows;
    }

    static async create({ name, genre, stock, AuthorId }) {
        const query = `insert into "Books" (name, genre, stock, "AuthorId") values ($1, $2, $3, $4)`;
        await pool.query(query, [ name, genre, stock, AuthorId ]);
    }

    static async findByPk(id) {
        let query = `select b.*, a.name author from "Books" b
        join "Authors" a on b."AuthorId" = a.id where b.id = $1
        `
        let { rows } = await pool.query(query, [ id ]);
        rows = rows.map(({ id, name, genre, stock, AuthorId, author }) => new Book(id, name, genre, stock, AuthorId, author));
        return rows[0];
    }

    static async update({ name, genre, stock, AuthorId }, id) {
        const query = `update "Books" set
        name = $1, 
        genre = $2, 
        stock = $3, 
        "AuthorId" = $4
        where id = $5`;
        await pool.query(query, [ name, genre, stock, AuthorId, id ]);
    }

    static async updateStock({ stock }, id) {
        const query = `update "Books" set
        stock = $1 
        where id = $2`;
        console.log(query, stock);
        await pool.query(query, [ stock, id ]);
    }
}

module.exports = Book;