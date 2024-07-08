# 📚 Book Store

Sebuah toko buku meminta bantuan kamu untuk membuat aplikasi yang melakukan listing terhadap buku yang mereka jual. Data yang akan disimpan adalah nama buku, harga, dan jumlah yang tersedia (stok), genre, dan penulis. Genre buku yang tersedia adalah Fiksi, Non-Fiksi, Anak-anak, dan Komik.

## Skema
Buatlah sebuah database schema diagram dalam bentuk digital yang menunjukkan struktur database yang akan digunakan untuk membuat aplikasi ini. Lebih detail lihat `Database & Table`.
Simpan file screenshoot ERD dengan nama file `erd.png`.

>note : 1 Author bisa mempunyai lebih dari 1 Buku dan 1 Buku hanya memiliki 1 Author.

## Database & Table
Buatlah *DATABASE* bernama `book-db` pada database PostgreSQL.
> Nama database wajib sesuai dengan requirement

Buatlah file `setup.js` yang berfungsi untuk membuat table `Authors` dan `Books` yang memiliki kolom-kolom sebagai berikut:

### Table Authors
| Field         | Datatype | Modifiers   |
| ------------- | -------- | ----------- |
| id            | SERIAL   | PRIMARY KEY |
| name          | VARCHAR  | NOT NULL    |

### Table Books
| Field         | Datatype | Modifiers   |
| ------------- | -------- | ----------- |
| id            | SERIAL   | PRIMARY KEY |
| name          | VARCHAR  | NOT NULL    |
| genre         | VARCHAR  | NOT NULL    |
| stock         | INTEGER  | NOT NULL    |
| AuthorId      | INTEGER  | FOREIGN KEY |

Jalankan file `setup.js` untuk membuat table `Authors` dan `Books` pada database yang telah dibuat.

## Seeding
Buatlah `sebuah` file `seed.js` yang berfungsi untuk melakukan seeding data ke dalam table `Authors` dan `Books` berdasarkan data dari `authors.json` dan `books.json`.

Jalankan file `seed.js` untuk melakukan seeding ke table pada database.

## Routes

Buatlah routing dengan menggunakan `ExpressJS` agar dapat melakukan *CRUD operations* dengan detail sebagai berikut:

| Method | Route              | Keterangan                                                                                                                      |
| ------ | -----------------  | ------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /                  | Menampilkan semua buku yang ada di dalam table `Books`                                                                          |
| GET    | /books/add         | Menampilkan halaman form untuk menambahkan data buku                                                                            |
| POST   | /books/add         | Menerima data yang dikirim dari halaman `/books/add` untuk melakukan _insertion_ ke dalam table `Books`                         |
| GET    | /books/edit/:id    | Menampilkan halaman form untuk mengedit data buku berdasarkan `id`                                                              |
| POST   | /books/edit/:id    | Menerima data yang dikirim dari halaman `/books/edit/:id` untuk melakukan _update_ pada table `Books` berdasarkan `id`          |
| GET    | /books/add/:id   | Melakukan edit data stock buku (+1) berdasarkan `id` yang dikirimkan                                              |
| GET    | /books/buy/:id   | Melakukan edit data stock buku (-1) berdasarkan `id` yang dikirimkan                                               |
| GET    | /books/delete/:id  | Melakukan _delete_ data buku berdasarkan `id` yang dikirimkan                                                                   |

## Read & Create
### Halaman Home atau Route `/`
Implementasikan routing `/` dengan membuat halaman `Home` dimana halaman ini menampilkan semua buku yang ada pada table `Books` dalam bentuk list yang terdiri dari kolom **id**, **name**, **genre**, **stock**, **author** (author name), dan **action**.

Pada kolom action terdapat 3 button link yaitu:
- `add` akan mengarah ke  `/books/add/:id`
- `buy` akan mengarah ke  `/books/buy/:id`
- `delete` akan mengarah ke `/books/delete/:id`.

### Halaman Add Book atau Route `/books/add`
Halaman add akan menampilkan form untuk memasukkan data buku yang akan disimpan ke dalam database.

Untuk bagian `genre` menggunakan select input yang terdapat 4 pilihan:
  - Fiksi
  - Non-Fiksi
  - Anak-anak
  - Komik

Untuk bagian `author` menggunakan select input dimana pilihannya dinamis dari database table `Authors`

Apabila berhasil menambahkan buku maka halaman akan berpindah ke home atau `/`

## Edit & Delete
### Halaman Edit Book atau Route `/books/edit/:id`
Implementasikan halaman edit book pada route `/books/edit/:id`.

Pada halaman update data Books, tampilkanlah data book yang sudah ter-populate berdasarkan id.

Saat edit, genre dan author harus terpopulate sesuai dengan data yang ada di database.

Dan ketika tombol “Update” ditekan maka ubahlah data book berdasarkan id-nya dan setelah berhasil, arahkan user kembali ke halaman book list dan data harus sudah ter-update.

### Button add atau Route `GET /books/add/:id`
Button ini berfungsi untuk menambahkan stock buku (+1) dengan `id` yang dikirimkan.
Apabila berhasil update stock buku maka halaman akan berpindah ke home atau `/`

### Button buy atau Route `GET /books/buy/:id`
Button ini berfungsi untuk mengurangi stock buku (-1) dengan `id` yang dikirimkan. Dengan ketentuan minimum stock buku adalah **0**. Apabila sudah **0** maka tidak bisa diminus lagi stocknya.
Apabila berhasil update stock buku maka halaman akan berpindah ke home atau `/`

### Delete Book atau Route `/books/delete/:id`
Untuk mengimplementasikan routing ini, kamu tidak perlu membuat halaman baru, tapi cukup dengan menekan tombol delete yang akan mengarahkan routing ke `/books/delete/:id` dimana proses delete akan dilakukan berdasarkan `id` yang dikirimkan.
> Hanya buku yang memiliki `stock` **0** yang dapat dihapus

Apabila berhasil menghapus buku maka halaman akan berpindah ke home atau `/`

## Validation
Buatlah validasi pada **server** untuk fitur `Add` dan `Edit`:

- `name` harus terdiri dari minimal 2 kata (*words*)
- `genre` tidak boleh dikosongkan
- `stock` harus terdiri dari number diantara 0 - 100
- `author` tidak boleh dikosongkan

Jika kondisi diatas tidak terpenuhi maka data tidak akan bertambah/berubah dan tampilkan pesan error.

**NOTE**
Untuk pesan error bisa ditampilkan dengan menggunakan `res.send`. Pesan error bebas selama yang ditampilkan jelas dan sesuai dengan error yang terjadi.
