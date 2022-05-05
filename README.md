
## NESP-project

--------------------------------------------------------------------------------

#### About:

> Blog-like API with following features:
> 
> NodeJS
> Express
> Sequelize
> PostgreSQL

#### Features:

> - JWT authentication
> - Migrations/Schema, Seeders, Models (Sequelize)
> - Models and Relationships, CRUDs
> - File Upload with Multer
> - Custom Middleware, Validations
> - Configs, Utilities, Controllers structure

#### Requirements

- NPM with NodeJS (or Nginx server) installed
- PostgreSQL installed

#### Installation:

- Create DB

- Run following commands:
```
git clone git@github.com:boolfalse/nesp-project.git
cd nesp-project/
npm i
```

- Create .env file inside your project root folder, and define required variables as described in `.env.example`

- Run migrations and seeds
```
sequelize db:migrate:undo:all
sequelize db:migrate
sequelize db:seed:all

# in one-line command
sequelize db:migrate:undo:all; sequelize db:migrate; sequelize db:seed:all
```

- Run the app
```
# for development
npm run dev
# for production
npm start
```

- [Optional] Use the exported `NESP-project.postman_collection.json` Postman API collection (v2.1) for testing the API.
  Otherwise, use the API documentation (see below).

#### Published API documentation:

- [Postman Collection](https://documenter.getpostman.com/view/1747137/Uyxbq9Vy)

#### Author:

- [BoolFalse](https://boolfalse.com/)
