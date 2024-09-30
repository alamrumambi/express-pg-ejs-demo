const pool = require('./connection');
const fs = require('fs');

const seedAuthors = `insert into "Authors" (name) values\n` + JSON.parse(fs.readFileSync('./data/authors.json', 'utf-8')).map((e) => `('${e.name}')`).join(',\n') + ` returning *`;
// const authors = JSON.parse(fs.readFileSync('./data/authors.json', 'utf-8')).map((e) => `('${e.name}')`).join(',\n');

const seedBooks = `insert into "Books" ( name, genre, stock, "AuthorId") values\n` + JSON.parse(fs.readFileSync('./data/books.json', 'utf-8')).map((e) => `('${e.name}', '${e.genre}', '${e.stock}', '${e.AuthorId}')`).join(',\n') + ' returning *';
// console.log(seedBooks);

async function test() {
    try {
        const {rows} = await pool.query(seedAuthors);
        console.log(`Success seed table Authors`);
        console.table(rows);
        const {rows: rows2} = await pool.query(seedBooks);
        console.log(`Success seed table Books`);
        console.table(rows2);
    } catch(err) {
        console.log(`====\nERROR\n====`);
        console.error(err);
    }
}

test();