const pool = require('./connection');

let query = `create table "Authors" (
    id serial primary key,
    name varchar not null
)`;

let query2 = `create table "Books" (
    id serial primary key,
    name varchar not null,
    genre VARCHAR NOT NULL,
    stock INTEGER NOT NULL,
    "AuthorId" INTEGER references "Authors" (id)
)`;

// async function test () {
//     try {
//         // await pool.query(query)
//         // console.log('table Authors berhasil dibuat');
//         await pool.query(query2)
//         console.log('table Books berhasil dibuat');
//     } catch(err) {
//         console.log(err);
//     }
// }

// test();