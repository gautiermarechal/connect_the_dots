# Server Documentation

## Routes

### Users

| Method            | Endpoint        | HTTP   |
| ----------------- | --------------- | ------ |
| Get all users     | `/users`        | GET    |
| Get user by id    | `/users/:id`    | GET    |
| Get user by email | `/users/:email` | GET    |
| Create user       | `/users`        | POST   |
| Update user by id | `/users/:id`    | PUT    |
| Delete user by id | `/users/:id`    | DELETE |

#### User data structure

````json
{
    "_id": "b74aae4e-062d-4310-a724-cdf7076da199",
    "username": "johnsmith",
    "email": "johnsmith@hello.com",
    "password": "cjksdnjcswdnos",
    "connections": [],
    "connections_bookmarked": []
}```

### Connections

| Method                   | Endpoint           | HTTP   |
| ------------------------ | ------------------ | ------ |
| Get all connections      | `/connections`     | GET    |
| Get connection by id     | `/connections/:id` | GET    |
| Create connection        | `/connections`     | POST   |
| Update connection by id  | `/connections/:id` | PUT    |
| Delete connections by id | `/connections/:id` | DELETE |

### Books
````
