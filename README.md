# API Endpoints

## Users

- `GET /api/v1/users`: Mengambil semua pengguna.
- `POST /api/v1/users`: Membuat pengguna baru. Body permintaan harus berisi `name`, `email`, dan `password`.

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

- `GET /api/v1/users/:id` : Mengambil pengguna dengan ID tertentu.
- `PUT /api/v1/users/:id` : Memperbarui pengguna dengan ID tertentu. Body permintaan harus berisi name, email, dan password yang baru.

- `DELETE /api/v1/users/:id`: Menghapus pengguna dengan ID tertentu.

## NEWS

- `GET /api/v1/news` : Mengambil semua berita.
- `GET /api/v1/news/filter?search={query}` : Search Query.
- `GET /api/v1/news/query` : Mengambil semua berita dengan alias tertentu.
- `GET /api/v1/news` : Mengambil semua berita.
- `GET /api/v1/news/keywords` : Mengambil semua berita berdasarkan kata kunci.
- `GET /api/v1/news/all/author` : Mengambil semua penulis berita.
- `GET /api/v1/news/all/keywords` : Mengambil semua kata kunci berita.
- `GET /api/v1/news/filter/author` : Mengambil semua berita berdasarkan penulis.
- `GET /api/v1/news/filter/keywords` : Mengambil semua berita berdasarkan kata kunci.

## CRUD NEWS

- `POST /api/v1/news` : Membuat berita baru.
- `GET /api/v1/news/:id` : Mengambil berita dengan ID tertentu.
- `DELETE /api/v1/news/:id` : Menghapus berita dengan ID tertentu.
- `PUT /api/v1/news/:id` : Memperbarui berita dengan ID tertentu.
