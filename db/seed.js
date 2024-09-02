const pool = require("./connection");
const fs = require('fs');

let query = `insert into "Authors" (name)
values `;
// console.log(JSON.parse(fs.readFileSync('./data/authors.json', 'utf-8')).map((e) => `('${e.name}')`).join(',\n'));
query += JSON.parse(fs.readFileSync('./data/authors.json', 'utf-8')).map((e) => `('${e.name}')`).join(',\n') + ' returning *;';
// console.log(query);

let query2 = `insert into "Books" (name, genre, stock, "AuthorId")
values `;
query2 += JSON.parse(fs.readFileSync('./data/books.json', 'utf-8')).map((e) => `('${e.name}', '${e.genre}', '${e.stock}', '${e.AuthorId}')`).join(',\n') + ' returning *;';
// console.log(query2);

async function test() {
    try {
        const { rows } = await pool.query(query);
        console.log('seed table "Authors" success');
        console.table(rows);
        const { rows:rows2 } = await pool.query(query2);
        console.log('seed table "Books" success');
        console.table(rows2);
    } catch(err) {
        console.error(err);
    }
}

test();