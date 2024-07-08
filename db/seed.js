const pool = require('./connection');
const fs = require('fs');

let query = `INSERT INTO "Authors" (name)
VALUES `

query += JSON.parse(fs.readFileSync('./data/authors.json', 'utf-8')).map(({ name }) => {
    return `('${name}')`
}).join(',\n');

let query2 = `INSERT INTO "Books" (name, genre, stock, "AuthorId")
VALUES `

query2 += JSON.parse(fs.readFileSync('./data/books.json', 'utf-8')).map(({ name, genre, stock, AuthorId }) => {
    return `('${name}', '${genre}', '${stock}', '${AuthorId}')`
}).join(',\n');

// console.log(query2);

// async function test () {
//     try {
//         // await pool.query(query)
//         // console.log('seed Authors berhasil');
//         await pool.query(query2)
//         console.log('seed Books berhasil');
//     } catch(err) {
//         console.log(err);
//     }
// }

// test();
