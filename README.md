
## NESP-project

Node, Express, Sequelize, Postgres project

---

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

#### Useful links:

- [Creating user, database and adding access on PostgreSQL](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)
- [PostgreSQL Drop Database with Examples](https://phoenixnap.com/kb/postgresql-drop-database)
- [express-useragent](https://www.npmjs.com/package/express-useragent)
- [Sequelize upsert method - Tutorial with example JS code](https://sebhastian.com/sequelize-upsert/)
- [sequelize.import is not a function](https://stackoverflow.com/questions/62917111/sequelize-import-is-not-a-function)
- [Selecting a random record from Sequelize findAll](https://stackoverflow.com/questions/42146200/selecting-a-random-record-from-sequelize-findall)
- [node.js sequelize: multiple 'where' query conditions](https://stackoverflow.com/questions/10807765/node-js-sequelize-multiple-where-query-conditions)
- [Sequelize error when using "where" and "in" on a subarray](https://stackoverflow.com/questions/24920427/sequelize-error-when-using-where-and-in-on-a-subarray)
- [Default value for created_at or updated_at isn't added when using underscored: true #10754](https://github.com/sequelize/sequelize/issues/10754)
- [Add automatic createdAt and updatedAt timestamps in migration](https://stackoverflow.com/questions/50735578/add-automatic-createdat-and-updatedat-timestamps-in-migration)
- [allowNull: false and defaultValue: Sequelize.NOW not populating field with default value. #645](https://github.com/sequelize/sequelize/issues/645)
- [Nodejs sequelize bulk upsert](https://stackoverflow.com/questions/48124949/nodejs-sequelize-bulk-upsert)

#### Author:

- [BoolFalse](https://boolfalse.com/)
