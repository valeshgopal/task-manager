
# Task Manager

A MERN stack application which allows users to perform CRUD operations on custom tasks. Users are authenticated using JWT token mechanism.




## Demo

https://task-manager-valesh.cyclic.app/


## Tech Stack

**Client:** React

**Global State Management:** Context API and useReducer hook

**Server:** Node, Express

**Database:** MongoDB


## API Reference

#### Get all items

```http
  GET /api/todos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `jwt_token` | `string` | **Required**. Authorization token |

#### Create todo

```http
  POST /api/todos/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt_token` | `string` | **Required**. Authorization token |

#### Edit todo

```http
  PUT /api/todos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to edit |

#### Delete todo

```http
  DELETE /api/todos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |


## Run Locally

Clone the project

```bash
git clone https://github.com/valeshgopal/task-manager.git
```

Go to the project directory

```bash
cd mern-todo-auth
```

Install server dependencies

```bash
npm install
```

Start the server

```bash
npm run start
```

Install client dependencies

```bash
cd client && npm install
```

Start the client

```bash
npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI=mongodb+srv://valeshgopal:valeshgopal@mern-todo-full.edckbwn.mongodb.net/`

`SECRET=bQeThWmZq4t6w9z$C&FlJ@NcRfUjXn2r`

`PORT=5000`

