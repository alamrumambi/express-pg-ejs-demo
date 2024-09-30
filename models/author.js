const pool = require('../db/connection');

class Author {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async findAll() {
        const query = `select * from "Authors" a;`
        let { rows } = await pool.query(query);
        rows = rows.map(({ id, name }) => new Author(id, name));
        return rows;
    }
}

module.exports = Author;