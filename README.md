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

- `DELETE` /api/v1/users/:id: Menghapus pengguna dengan ID tertentu.

## NEWS

- `GET` /api/v1/news: Mengambil semua berita.
