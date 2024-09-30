const pool = require('./connection');

const createAuthors = `create table "Authors" (
    id serial primary key,
    name varchar not null
)`;

const createBooks = `create table "Books" (
    id serial primary key,
    name varchar not null,
    genre varchar not null,
    stock integer not null,
    "AuthorId" integer references "Authors" (id)
)`;

async function test() {
    try {
        await pool.query(createAuthors);
        console.log(`Success create table Authors`);
        await pool.query(createBooks);
        console.log(`Success create table Books`);
    } catch(err) {
        console.log(`====\nERROR\n====`);
        console.error(err);
    }
}

test();