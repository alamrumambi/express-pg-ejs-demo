const pool = require("./connection");

let query = `create table "Authors" (
    id serial primary key,
    name varchar not null
);`

let query2 = `create table "Books" (
    id serial primary key,
    name varchar not null,
    genre varchar not null,
    stock integer not null,
    "AuthorId" integer references "Authors" (id)
);`

async function test() {
    try {
        await pool.query(query);
        console.log('create table "Authors" success');
        await pool.query(query2);
        console.log('create table "Books" success');
    } catch(err) {
        console.error(err);
    }
}

test();