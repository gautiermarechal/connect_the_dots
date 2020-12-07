# Server Documentation

## Routes

### Users

| Method            | Endpoint        | HTTP   |
| ----------------- | --------------- | ------ |
| Get all users     | `/users`        | GET    |
| Get user by id    | `/users/:id`    | GET    |
| Get user by email | `/users/:email` | GET    |
| Create user       | `/users`        | POST   |
| Update user by id | `/users/:id`    | PATCH  |
| Delete user by id | `/users/:id`    | DELETE |

#### User data structure

```json
{
  "_id": "b74aae4e-062d-4310-a724-cdf7076da199",
  "userTag": "John Smith",
  "username": "johnsmith",
  "email": "johnsmith@hello.com",
  "password": "cjksdnjcswdnos",
  "connections": [],
  "connections_bookmarked": [],
  "books_bookmarked": [],
  "categories_bookmarked": [],
  "authors_bookmarked": []
}
```

### Connections

| Method                   | Endpoint           | HTTP   |
| ------------------------ | ------------------ | ------ |
| Get all connections      | `/connections`     | GET    |
| Get connection by id     | `/connections/:id` | GET    |
| Create connection        | `/connections`     | POST   |
| Update connection by id  | `/connections/:id` | PUT    |
| Delete connections by id | `/connections/:id` | DELETE |

#### Connection data structure

```json
{
  "_id": "1be0093c-6f40-4f18-b67b-25e164d07583",
  "created_at": "10/30/20",
  "author": {
    "_id": "b74aae4e-062d-4310-a724-cdf7076da199",
    "name": "John Smith",
    "username": "johnsmith"
  },
  "likes": 120,
  "bookmarks": 45,
  "bannerSrc": "imagesrc",
  "books": [],
  "categories": [],
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "media": [],
  "comments": []
}
```

#### Comments data structure

```json
{
  "_id": "b74aac4e-062d-4310-a724-cdf7076da199",
  "created_at": "10/30/20",
  "author": {
    "_id": "b74aae4e-062d-4310-a724-cdf7076da199",
    "name": "John Smith",
    "username": "johnsmith"
  },
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
}
```

### Books

#### Books data structure

```json
{
  "ISBN": 11111111111111,
  "author": "Shakespeare",
  "title": "Hamlet",
  "categories": []
}
```
